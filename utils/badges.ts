export const getBountyStatusBadge = (status: string) => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
  switch (status) {
    case 'pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case 'active':
      return `${baseClasses} bg-blue-100 text-blue-800`;
    case 'completed':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'cancelled':
      return `${baseClasses} bg-red-100 text-red-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};
