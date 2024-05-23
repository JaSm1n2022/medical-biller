import moment from "moment";

class MedicaidHandler {
  static columns(main) {
    return [
      { width: 92, name: "actions", header: "Actions", visible: main },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "billed_on",
        header: "Billed On",
      },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "paid_on",
        header: "Paid On",
      },
      {
        defaultFlex: 1,
        minWidth: 120,
        name: "paid_issued",
        header: "Paid Issued",
      },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "eft",
        header: "EFT",
      },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "provider",
        header: "Provider",
      },
      {
        defaultFlex: 1,
        minWidth: 200,
        name: "client_code",
        header: "Client",
      },
      {
        defaultFlex: 1,
        visible: false,
        minWidth: 100,
        name: "client_name",
        header: "Client Name",
      },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "date_of_service",
        header: "DOS",
      },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "service_code",
        header: "Code",
      },
      {
        defaultFlex: 1,
        minWidth: 300,
        name: "service_desc",
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
        name: "billed_amount",
        header: "Billed Amount",
      },
      {
        defaultFlex: 1,
        minWidth: 120,
        name: "paid_amount",
        header: "Paid Amount",
      },
      {
        defaultFlex: 1,
        minWidth: 240,
        name: "comments",
        header: "Comments",
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
