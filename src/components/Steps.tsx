
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface StepsProps {
  currentStep: number;
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    { id: 1, name: "Website URL" },
    { id: 2, name: "App Details" },
    { id: 3, name: "Generate" },
    { id: 4, name: "Complete" },
  ];

  return (
    <div className="md:flex md:items-center md:justify-between">
      <nav aria-label="Progress" className="w-full">
        <ol role="list" className="space-y-3 md:flex md:space-x-2 md:space-y-0">
          {steps.map((step) => (
            <li key={step.id} className="md:flex-1">
              <div
                className={cn(
                  "group flex flex-col border py-2 px-3 md:pl-4 md:pr-8 md:py-3 border-gray-300 rounded-md",
                  step.id < currentStep
                    ? "border-blue-600 bg-blue-50"
                    : step.id === currentStep
                    ? "border-blue-600 bg-white"
                    : "border-gray-200 bg-white"
                )}
              >
                <span className="text-xs font-medium flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full",
                      step.id < currentStep
                        ? "bg-blue-600 text-white"
                        : step.id === currentStep
                        ? "border border-blue-600 text-blue-600"
                        : "border border-gray-300 text-gray-500"
                    )}
                  >
                    {step.id < currentStep ? (
                      <CheckIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      step.id
                    )}
                  </span>
                  <span
                    className={cn(
                      step.id < currentStep
                        ? "text-blue-600"
                        : step.id === currentStep
                        ? "text-blue-600"
                        : "text-gray-500"
                    )}
                  >
                    {step.name}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
