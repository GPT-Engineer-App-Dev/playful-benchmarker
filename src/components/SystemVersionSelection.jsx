import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SystemVersionSelection = ({ systemVersion, setSystemVersion }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Select System Version</h2>
      <Select value={systemVersion} onValueChange={setSystemVersion}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select system version" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="http://localhost:8000">http://localhost:8000</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SystemVersionSelection;