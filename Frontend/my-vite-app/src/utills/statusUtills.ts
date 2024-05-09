export function getStatusColor(status: string) {
  switch (status) {
    case "Pending":
      return "text-green-800";
    case "Accepted":
      return " text-blue-800";
    case "Cancelled":
      return "bg-red-200 text-red-800";
    default:
      return " text-gray-800";
  }
}
