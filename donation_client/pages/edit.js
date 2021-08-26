import styles from "../styles/Home.module.css";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import clientQuery from "../services/client-query";
import { useRouter } from "next/router";

const EditDonation = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  const [donation, setDonation] = useState();

  async function loadDonation(id) {
    const query = `query getDonation($id:Int!) {
        getDonation(id:$id) {
          id
          amount
          tip
          email
        }
    }`;
    const res = await clientQuery(query, { id });
    if (res) return res.getDonation;
  }

  useEffect(async () => {
    const res = await loadDonation(id);
    setDonation(res);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const form = document.getElementById("edit-frm");
    console.log(form.id.value);
    const donation = {
      id: Number(form.id.value),
      email: form.email.value,
      amount: Number(form.amount.value),
      tip: Number(form.tip.value),
    };

    if (form.checkValidity()) {
      const query = `mutation updateDonation($donation:DonationInputs!) {
       updateDonation(donation:$donation) 
    }`;
      const res = await clientQuery(query, { donation });

      router.push("/");
    } else alert("please fill  empty fields");
  };
  return (
    <div className={styles.container}>
      {donation && (
        <Form id="edit-frm" className={styles.form}>
          <h3 style={{ textAlign: "center" }}>Edit Page</h3>
          <Form.Group as={Col}>
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter email"
              name="id"
              value={donation.id}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              defaultValue={donation.email}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              placeholder="0"
              name="amount"
              type="number"
              defaultValue={donation.amount}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Tip</Form.Label>
              <Form.Control
                placeholder="0"
                name="tip"
                type="number"
                defaultValue={donation.tip}
                required
              />
            </Form.Group>
          </Row>

          <Button onClick={handleSave} variant="primary" type="submit">
            Save
          </Button>
        </Form>
      )}
    </div>
  );
};

export default EditDonation;
