import styles from "../styles/Home.module.css";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import clientQuery from "../services/client-query";
import { useRouter } from "next/router";

export default function Home() {
  const [donations, setDonations] = useState();
  const router = useRouter();
  useEffect(() => {
    async function loadDonations() {
      const query = `query getDonations {
        getDonations {
              id
              amount
              tip
              email
          
        }
      }`;
      const res = await clientQuery(query);
      setDonations(res.getDonations);
    }
    loadDonations();
  }, []);

  const handleDonate = async (e) => {
    e.preventDefault();
    const form = document.getElementById("donate-frm");
    if (form.checkValidity()) {
      const query = `mutation createDonation($donation:DonationInputs) {
       createDonation(donation:$donation) {
        id
        amount
        tip
        email
       }
    }`;
      const donation = {
        firstName: form.firstname.value,
        lastName: form.lastname.value,
        email: form.email.value,
        amount: Number(form.amount.value),
        tip: Number(form.tip.value),
      };
      const res = await clientQuery(query, { donation });
      setDonations(res.createDonation);
      form.reset();
    } else alert("please fill  empty fields");
  };

  const handleDelete = async (id) => {
    const query = `mutation deleteDonation($id:Int!) {
       deleteDonation(id:$id) {
        id
        amount
        tip
        email
       }
    }`;
    const res = await clientQuery(query, { id });
    setDonations(res.deleteDonation);
  };
  const handleEdit = (id) => {
    router.push(`/edit?id=${id}`);
  };
  return (
    <div className={styles.container}>
      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Tip</th>
          </tr>
        </thead>
        <tbody>
          {donations &&
            donations.map((donation, index) => (
              <tr key={index}>
                <th>{donation.id}</th>
                <th>{donation.email}</th>
                <th>{donation.amount}</th>
                <th>{donation.tip}</th>
                <th>
                  <span onClick={() => handleDelete(donation.id)}>
                    <i
                      className="far fa-trash-alt"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>{" "}
                  &nbsp;
                  <span onClick={() => handleEdit(donation.id)}>
                    <i
                      className="far fa-edit"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>
      <div>
        <Form id="donate-frm" className={styles.form}>
          <Col className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstname"
                required
              />
            </Form.Group>
          </Col>
          <Form.Group className="mb-3">
            <Form.Label>LastName</Form.Label>
            <Form.Control placeholder="Last Name" name="lastname" required />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              placeholder="0"
              name="amount"
              type="number"
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Tip</Form.Label>
              <Form.Control placeholder="0" name="tip" type="number" required />
            </Form.Group>
          </Row>

          <Button onClick={handleDonate} variant="primary" type="submit">
            Donate
          </Button>
        </Form>
      </div>
    </div>
  );
}
