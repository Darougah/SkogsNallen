import React from 'react';

export const TimelineStep = ({
  step,
  order,
  isCompleted,
  isCurrent,
  isLastStep,
  icon,
  description
}) => {
  const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-100';
  const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
  const connectorColor = isCompleted ? 'bg-green-500' : 'bg-gray-300';
  const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
  const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-700' : 'text-gray-400';

  return (
    <li className="relative mb-6 sm:mb-0 sm:flex-1 sm:pl-10">
      <div className="flex items-center">
        <div
          className={`z-10 flex items-center justify-center w-8 h-8 ${iconBgColor} ${iconTextColor} rounded-full ring-2 ring-white`}
        >
          <i className={`ri-${icon.iconName} text-base`}></i>
        </div>

        {!isLastStep && (
          <div className={`hidden sm:block h-0.5 w-full ${connectorColor}`}></div>
        )}
      </div>

      <div className="mt-3 sm:pr-8">
        <h3 className={`font-semibold text-sm ${labelTextColor}`}>{step.label}</h3>
        <time className="block mb-1 text-xs text-gray-400">
          {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Tid saknas'}
        </time>
        <p className={`text-sm ${descriptionTextColor}`}>{description}</p>
      </div>
    </li>
  );
};
