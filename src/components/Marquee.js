function Marquee({ text }) {
  const content = [... new Array(30)].map((_, index) =>
    <span key={index} className="font-display text-[10px] font-semibold font-semiexpanded uppercase tracking-[2px] after:content-['•'] after:mx-2">
      {text}
    </span>
  )

  return (
    <div className="flex overflow-hidden select-none" aria-hidden="true">
      <div className="shrink-0 flex justify-around min-w-full">
        <span className="pt-0.5 pb-1.5 text-[#e9e8e1] bg-[#333333]">{content}</span>
      </div>
    </div>

  )
}

export default Marquee
