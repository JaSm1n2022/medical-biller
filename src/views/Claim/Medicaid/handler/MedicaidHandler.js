import moment from "moment";

class MedicaidHandler {
  static columns(main) {
    return [
      { width: 92, name: "actions", header: "Actions", visible: main },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "created",
        header: "Created",
      },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "provider",
        header: "Provider",
      },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "code",
        header: "Code",
      },
      {
        defaultFlex: 1,
        minWidth: 300,
        name: "description",
        header: "Description",
      },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "unit",
        header: "Unit",
      },
      {
        defaultFlex: 1,
        minWidth: 120,
        name: "rate",
        header: "Rate",
      },
    ];
  }
  static mapData(items) {
    items.forEach((i) => {
      i.created = moment(new Date(i.created_at)).format("YYYY-MM-DD");
    });
    return items;
  }
}
export default MedicaidHandler;
