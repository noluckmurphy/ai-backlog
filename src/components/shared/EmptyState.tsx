interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="p-6 text-center text-xs text-gray-500">{message}</div>
  );
}
