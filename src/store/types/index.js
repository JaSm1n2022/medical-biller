// @flow

export type BaseAction = {
  type: string,
  payload: ?any,
};
export type PatientState = {
  patientList: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },

  patientUpdate: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },

  patientDelete: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },
  patientCreate: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },
};
export type ServiceState = {
  serviceList: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },

  serviceUpdate: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },

  serviceDelete: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },
  serviceCreate: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },
};

export type ClaimState = {
  claimList: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },

  claimUpdate: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },

  claimDelete: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },
  claimCreate: {
    data: ?Object,
    error: ?string,
    status: ?string,
  },
};
