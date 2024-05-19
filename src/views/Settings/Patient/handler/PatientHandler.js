import moment from "moment";

class PatientHandler {
  static columns(main) {
    return [
      { width: 92, name: "actions", header: "Actions", visible: main },
      {
        defaultFlex: 1,
        minWidth: 200,
        name: "created",
        header: "Created",
      },
      {
        defaultFlex: 1,
        minWidth: 200,
        name: "patientCd",
        header: "Patient",
      },
      {
        visible: false,
        defaultFlex: 1,
        minWidth: 200,
        name: "name",
        header: "Name ",
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
export default PatientHandler;
