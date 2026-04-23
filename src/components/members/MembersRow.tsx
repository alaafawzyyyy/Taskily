export function MembersRow() {
  const members = [
    {
      email: 'alaa.shaaban943@getMaxListeners.com',
      initials: 'AF',
      name: 'Alaa Fawzy',
      role: 'software',
      date: '4 9 2003',
    },
    {
      email: 'alaa.shaaban94@getMaxListeners.com',
      initials: 'AF',
      name: 'Alaa Fawzy',
      role: 'software',
      date: '4 9 2003',
    },
    {
      email: 'alaa.shaaban43@getMaxListeners.com',
      initials: 'AF',
      name: 'Alaa Fawzy',
      role: 'software',
      date: '4 9 2003',
    },
  ];

  return (
    <div className="flex flex-col w-full border-[2px] border-[#F1F3FF] rounded-lg">
      <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_0.5fr] items-center px-6 py-4 text-[11px] tracking-[1.1px] uppercase font-bold text-[#434654]">
        <div>MEMBER</div>
        <div>ROLE</div>
        <div>JOINED AT</div>
        <div className="text-right">ACTIONS</div>
      </div>

      {members.map((m) => (
        <div
          key={m.email}
          className="
    border-[2px] border-[#F1F3FF] bg-white
    px-4 md:px-6 py-4
  "
        >
          {/* mobile */}
          <div className="flex md:hidden items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center font-bold">
                {m.initials}
              </div>
              <div>
                <p className="font-semibold leading-5 text-sm text-[#041B3C]">
                  {m.name}
                </p>
                <p className="text-[11px] leading-[16.5px] text-[#434654]">
                  {m.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[1px]">
              <span className="px-2 py-[2px] text-[10px] leading-[15px] -tracking-[0.25px] uppercase rounded-sm font-bold text-[#434654] bg-[#D7E2FF] text-center">
                {m.role}
              </span>
              <p className="text-end">⋮</p>
            </div>
          </div>

          {/* desktop */}
          <div
            className="
      hidden md:grid
      md:grid-cols-[2fr_1.5fr_1fr_0.5fr]
      items-center
    "
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center font-bold">
                {m.initials}
              </div>
              <div>
                <p className="font-semibold leading-5 text-sm text-[#041B3C]">
                  {m.name}
                </p>
                <p className="text-[11px] leading-[16.5px] text-[#434654]">
                  {m.email}
                </p>
              </div>
            </div>

            <div>
              <span className="px-3 py-1 text-xs rounded-full bg-[#0052CC] text-white ">
                {m.role}
              </span>
            </div>

            <div className="text-sm text-gray-600">{m.date}</div>

            <div className="flex justify-end">⋮</div>
          </div>
        </div>
      ))}
    </div>
  );
}
