export default function SearchParam({
  info,
  getFilterValue,
  setFilterValue,
}: {
  info: {
    id: string;
    name: string;
  };
  getFilterValue: (name: string) => string;
  setFilterValue: (id: string, value: string) => void | undefined;
}) {
  return (
    <input
      className="border-b max-w-[120px] border-b-slate-900 bg-transparent text-slate-900 placeholder:text-slate-900 outline-none text-sm"
      type="text"
      placeholder={info.name}
      value={getFilterValue(info.id) ?? ""}
      onChange={(event) => setFilterValue(info.id, event.target.value)}
    />
  );
}
