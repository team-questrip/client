interface FrameProps {
  children: React.ReactNode;
}

const Frame = ({ children }: FrameProps) => {
  return (
    <div className="flex justify-center h-screen w-screen bg-white">
      <div
        className="h-screen no-scrollbar overflow-y-scroll p-4 bg-white"
        style={{ width: '375px' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Frame;
