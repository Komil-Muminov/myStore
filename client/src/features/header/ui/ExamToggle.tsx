import { Switch, Popconfirm, message, Badge } from "antd";
import { useGetQuery, useMutationQuery, ApiRoutes } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  isReadOnly?: boolean;
}

export const ExamToggle = ({ isReadOnly }: IProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetQuery<{ isExamEnabled: boolean }>({
    url: ApiRoutes.EXAM_STATUS,
    queryKey: [ApiRoutes.EXAM_STATUS],
    options: { staleTime: 0 },
  });

  const isEnabled = data?.isExamEnabled ?? false;

  const { mutate, isPending } = useMutationQuery({
    onSuccess: () => {
      message.success("Ҳолати имтиҳон бомуваффақият иваз карда шуд");
      // Инвалидируем оба кэша — бэкенд меняет оба значения одновременно
      queryClient.invalidateQueries({ queryKey: [ApiRoutes.EXAM_STATUS] });
      queryClient.invalidateQueries({ queryKey: [ApiRoutes.REGISTRATION_STATUS] });
    },
    onError: () => {
      message.error("Хатогӣ ҳангоми иваз кардани ҳолати имтиҳон");
    },
  });

  const handleToggle = (checked: boolean) => {
    mutate({
      url: ApiRoutes.EXAM_STATUS,
      method: "PATCH",
      data: { isExamEnabled: checked },
    });
  };

  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 rounded-full border transition-all duration-300 ${
        isEnabled
          ? "bg-blue-50/50 border-blue-100 shadow-sm shadow-blue-50"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <Badge
          status={isEnabled ? "processing" : "default"}
          color={isEnabled ? "#3b82f6" : "#94a3b8"} 
        />
        <span
          className="hidden sm:inline-block font-semibold text-[12px] transition-colors duration-300"
          style={{ color: isEnabled ? "#1e40af" : "#475569" }}
        >
          {isEnabled ? "Имтиҳон: ФАЪОЛ" : "Имтиҳон: ҚАТЪ"}
        </span>
      </div>

      <Popconfirm
        placement="bottomRight"
        title={
          isEnabled
            ? "Қабули имтиҳонро қатъ мекунед?"
            : "Қабули имтиҳонро оғоз мекунед?"
        }
        description={
          isEnabled
            ? "Пас аз қатъ кардан, номзадҳо наметавонанд ба тестикунонӣ дастрасӣ пайдо кунанд."
            : "Пас аз оғоз кардан, тест барои номзадҳои интихобшуда дастрас мешавад."
        }
        onConfirm={() => handleToggle(!isEnabled)}
        okText="Ҳа"
        cancelText="Не"
        disabled={isLoading || isPending}
      >
        <Switch
          checked={isEnabled}
          loading={isLoading || isPending}
          size="small"
          className={isEnabled ? "bg-blue-500!" : "bg-slate-400!"}
          disabled={isReadOnly}
        />
      </Popconfirm>
    </div>
  );
};
