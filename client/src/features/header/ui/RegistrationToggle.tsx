import { Switch, Popconfirm, message, Badge, Tooltip } from "antd";
import { useGetQuery, useMutationQuery, ApiRoutes } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  isReadOnly?: boolean;
}

export const RegistrationToggle = ({ isReadOnly }: IProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetQuery<{ isRegistrationEnabled: boolean }>({
    url: ApiRoutes.REGISTRATION_STATUS,
    queryKey: [ApiRoutes.REGISTRATION_STATUS],
    options: { staleTime: 0 },
  });

  const { data: examData } = useGetQuery<{ isExamEnabled: boolean }>({
    url: ApiRoutes.EXAM_STATUS,
    queryKey: [ApiRoutes.EXAM_STATUS],
    options: { staleTime: 0 },
  });

  const isExamActive = examData?.isExamEnabled ?? false;
  // Если экзамен активен — анкета автоматически неактивна
  const isEnabled = isExamActive ? false : (data?.isRegistrationEnabled ?? true);
  // Переключатель заблокирован если: readOnly или экзамен активен
  const isDisabled = isReadOnly || isExamActive;

  const { mutate, isPending } = useMutationQuery({
    onSuccess: () => {
      message.success("Ҳолати бақайдгирӣ бомуваффақият иваз карда шуд");
      queryClient.invalidateQueries({ queryKey: [ApiRoutes.REGISTRATION_STATUS] });
      queryClient.invalidateQueries({ queryKey: [ApiRoutes.EXAM_STATUS] });
    },
    onError: () => {
      message.error("Хатогӣ ҳангоми иваз кардани ҳолати бақайдгирӣ");
    },
  });

  const handleToggle = (checked: boolean) => {
    mutate({
      url: ApiRoutes.REGISTRATION_STATUS,
      method: "PATCH",
      data: { isRegistrationEnabled: checked },
    });
  };

  return (
    <Tooltip
      title={isExamActive ? "Имтиҳон фаъол аст — қабули анкетҳо муваққатан баста аст" : undefined}
      placement="bottom"
    >
      <div
        className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 rounded-full border transition-all duration-300 ${
          isEnabled
            ? "bg-emerald-50/50 border-emerald-100 shadow-sm shadow-emerald-50"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <Badge
            status={isEnabled ? "processing" : "default"}
            color={isEnabled ? "#10b981" : "#94a3b8"}
          />
          <span
            className="hidden sm:inline-block font-semibold text-[12px] transition-colors duration-300"
            style={{ color: isEnabled ? "#065f46" : "#475569" }}
          >
            {isEnabled ? "Қабули анкетҳо: ФАЪОЛ" : "Қабули анкетҳо: ҚАТЪ"}
          </span>
        </div>

        <Popconfirm
          placement="bottomRight"
          title={
            isEnabled
              ? "Қабули дархостҳоро қатъ мекунед?"
              : "Қабули дархостҳоро оғоз мекунед?"
          }
          description={
            isEnabled
              ? "Пас аз қатъ кардан, номзадҳо наметавонанд анкета пешниҳод кунанд."
              : "Пас аз оғоз кардан, форма барои ҳамаи номзадҳо дастрас мешавад."
          }
          onConfirm={() => handleToggle(!isEnabled)}
          okText="Ҳа"
          cancelText="Не"
          disabled={isLoading || isPending || isDisabled}
        >
          <Switch
            checked={isEnabled}
            loading={isLoading || isPending}
            size="small"
            className={isEnabled ? "bg-emerald-500!" : "bg-slate-400!"}
            disabled={isDisabled}
          />
        </Popconfirm>
      </div>
    </Tooltip>
  );
};
