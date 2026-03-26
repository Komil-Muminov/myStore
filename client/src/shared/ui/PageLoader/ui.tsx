import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface PageLoaderProps {
  tip?: string;
  isOverlay?: boolean;
}

export const PageLoader = ({ tip, isOverlay = false }: PageLoaderProps) => {
  
  const customIcon = <LoadingOutlined className="text-blue-600 text-5xl" spin />;

  
  const wrapperClasses = isOverlay
    ? 'absolute inset-0 z-50 bg-white/70 backdrop-blur-sm' 
    : 'min-h-[100dvh] bg-slate-50'; 

  return (
    <div className={`flex w-full items-center justify-center ${wrapperClasses}`}>
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <Spin indicator={customIcon} size="large" />
        {tip && (
          <span className="text-sm font-medium tracking-wide text-slate-500">
            {tip}
          </span>
        )}
      </div>
    </div>
  );
};