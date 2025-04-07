
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  iconColor,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2 mb-1">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && trendValue && (
              <div 
                className={cn(
                  "text-xs font-medium mt-2", 
                  trend === "up" && "text-green-600",
                  trend === "down" && "text-red-600" 
                )}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
              </div>
            )}
          </div>
          <div 
            className={cn(
              "p-2 rounded-md", 
              iconColor || "bg-campus-primary/10"
            )}
          >
            <Icon 
              className={cn(
                "h-5 w-5", 
                iconColor ? "text-white" : "text-campus-primary"
              )} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
