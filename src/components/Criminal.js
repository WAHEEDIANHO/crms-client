import { faker } from "@faker-js/faker";

function Criminal({ id, criminal }) {
  return (
    <table
      className="table table-striped table-hover table-bordered w-75 mx-auto"
      key={id}
    >
      <tbody>
        <tr>
          <td rowSpan="5">
            <img src={faker.image.avatar()} alt="from faker" />
          </td>
          <td>Criminal Name</td>
          <td>{criminal.name.toUpperCase()}</td>
        </tr>
        <tr>
          <td>Criminal Type</td>
          <td>{criminal.type}</td>
        </tr>
        <tr>
          <td>Contact No</td>
          <td> {criminal.mobile} </td>
        </tr>
        <tr>
          <td>Height</td>
          <td> {criminal.height} </td>
        </tr>
        <tr>
          <td>Weight</td>
          <td> {criminal.weight} </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Criminal;
