import {
  DataTable,
  DateField,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  UrlField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  DateInput,
  required,
} from "react-admin";

export const DriverList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="driver_ref" />
      <DataTable.Col source="number" />
      <DataTable.Col source="code" />
      <DataTable.Col source="forename" />
      <DataTable.Col source="surname" />
      <DataTable.Col source="dob">
        <DateField source="dob" />
      </DataTable.Col>
      <DataTable.Col source="nationality" />
      <DataTable.Col source="url">
        <UrlField source="url" />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const DriverShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="driver_ref" />
      <DateField source="number" />
      <TextField source="code" />
      <TextField source="forename" />
      <TextField source="surname" />
      <DateField source="dob" />
      <TextField source="nationality" />
      <UrlField source="url" />
    </SimpleShowLayout>
  </Show>
);
  /*
    new_driver = {
        'id': 12345,
        'driver_ref': 'Doe',
        'number': '12345',
        'code': 'DOE',
        'forename': 'John',
        'surname': 'Doe',
        'dob': '1990-01-01',
        'nationality': 'American',
        'url': 'http://example.com/driver/12345',
    }

  */
const nationalities = [
  { id: 'American', name: 'American' },
  { id: 'British', name: 'British' },
  { id: 'Spanish', name: 'Spanish' },
]

// Create Form
export const DriverCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput label="Driver Ref" source="driver_ref" validate={required()} />
            <TextInput label="Number" source="number" validate={required()} />
            <TextInput label="Code" source="code" validate={required()} />
            <TextInput label="First Name" source="forename" validate={required()} />
            <TextInput label="Last Name" source="surname" validate={required()} />
            <DateInput label="Date of Birth" source="dob" validate={required()} />
            <SelectInput label="Nationality" source="nationality" choices={nationalities} validate={required()} />
            <TextInput label="URL" source="url" type="url" validate={required()} />
        </SimpleForm>
    </Create>
);

// Edit Form
export const DriverEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled label="ID" source="id" />
            <TextInput label="Driver Ref" source="driver_ref" validate={required()} />
            <TextInput label="Number" source="number" validate={required()} />
            <TextInput label="Code" source="code" validate={required()} />
            <TextInput label="First Name" source="forename" validate={required()} />
            <TextInput label="Last Name" source="surname" validate={required()} />
            <DateInput label="Date of Birth" source="dob" validate={required()} />
            <SelectInput label="Nationality" source="nationality" choices={nationalities} validate={required()} />
            <TextInput label="URL" source="url" type="url" validate={required()} />
        </SimpleForm>
    </Edit>
);