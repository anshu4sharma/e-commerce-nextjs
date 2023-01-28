type TBar = {
  animationDuration: number,
  progress: number
}
export const Bar = ({ animationDuration, progress }: TBar) => (
  <div
    className='bg-yellow-400 h-[6px] w-full left-0 top-0 fixed z-50 shadow-md'
    style={{
      marginLeft: `${(-1 + progress) * 100}%`,
      transition: `margin-left ${animationDuration}ms linear`,
    }}
  ></div>
);
