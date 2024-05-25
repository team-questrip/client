interface FrameProps {
  children: React.ReactNode;
}

const Frame = ({ children }: FrameProps) => {
  return (
    <div className="flex justify-center w-screen h-full">
      <div className="h-full p-4 bg-white relative" style={{ width: '375px' }}>
        {children}
      </div>
    </div>
  );
};

export default Frame;
