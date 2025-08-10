import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

interface ActionProps {
  title?: string;
  actions: QuickActionsProps[];
}

const QuickActions = ({ title, actions }: ActionProps) => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Button
              key={idx}
              className="w-full justify-start"
              variant="outline"
              onClick={action.onClick}
            >
              <Icon className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
