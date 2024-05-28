import moment from "moment";

class MedicaidHandler {
  static columns(main) {
    return [
      { width: 92, name: "actions", header: "Actions", visible: main },

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
        minWidth: 200,
        name: "eft_number",
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
        name: "client",
        header: "Client",
      },
      {
        defaultFlex: 1,

        minWidth: 100,
        name: "service_cd",
        header: "Service",
      },
      {
        defaultFlex: 1,

        minWidth: 100,
        name: "service_mod",
        header: "Modifier",
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
        name: "dos",
        header: "DOS",
      },
      {
        defaultFlex: 1,
        minWidth: 100,
        name: "eos",
        header: "EOS",
      },

      {
        defaultFlex: 1,
        minWidth: 100,
        name: "billed_amt",
        header: "Billed Amt",
      },

      {
        defaultFlex: 1,
        minWidth: 120,
        name: "paid_amt",
        header: "Paid Amt",
      },
      {
        defaultFlex: 1,
        minWidth: 120,
        name: "status",
        header: "Status",
      },
      {
        defaultFlex: 1,
        minWidth: 300,
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
