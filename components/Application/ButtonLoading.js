import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const ButtonLoading = ({ type, text, loading, className,onClick }) => {
  return (
    <Button type={type} size="sm" disabled={loading} className={cn("",className)} onClick={onClick}>
      {loading && <Loader2Icon className="animate-spin" />}
      {text}
    </Button>
  );
};
export default ButtonLoading;
