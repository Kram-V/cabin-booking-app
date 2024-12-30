import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      queryName="last"
      options={[
        { value: "7", title: "Last 7 days" },
        { value: "30", title: "Last 30 days" },
        { value: "90", title: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
