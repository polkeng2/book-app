export default function SearchParam({
  info,
  getFilterValue,
  setFilterValue,
}: {
  info: {
    id: string;
    name: string;
  };
  getFilterValue: (id: string) => string;
  setFilterValue: (id: string, value: string) => void | undefined;
}) {
  return (
    <input
      className="border-b max-w-[120px] border-b-slate-300 bg-transparent text-slate-200 placeholder:tex outline-none text-sm"
      type="text"
      placeholder={info.name}
      value={getFilterValue(info.id) ?? ""}
      onChange={(event) => setFilterValue(info.id, event.target.value)}
    />
  );
}
