import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import "./AddItems.css";

function AddItem({ snacks = [], drinks = [], setSnacks = () => { }, setDrinks = () => { } }) {
    const [snackForm, setSnackForm] = useState({ "id": "", "name": "", "description": "", "recipe": "", "serve": "" });
    const [drinkForm, setDrinkForm] = useState({ "id": "", "name": "", "description": "", "recipe": "", "serve": "" });
    let navigate = useNavigate();

    const updateSnackForm = event => {
        setSnackForm({
            ...snackForm,
            [event.target.name]: event.target.value,
        });
    };

    const updateDrinkForm = event => {
        setDrinkForm({
            ...drinkForm,
            [event.target.name]: event.target.value,
        });
    };

    const addSnack = event => {
        event.preventDefault();
        setSnacks([...snacks, snackForm]);
        setSnackForm({ "id": "", "name": "", "description": "", "recipe": "", "serve": "" });
        navigate('/snacks');
    };

    const addDrink = event => {
        event.preventDefault();
        setDrinks([...drinks, drinkForm]);
        setDrinkForm({ "id": "", "name": "", "description": "", "recipe": "", "serve": "" });
        navigate('/drinks');
    };

    return (
        <section className="col-md-4">
            <Card>
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                        Add Snack
                    </CardTitle>
                    <form onSubmit={addSnack}>
                        <input type="text" placeholder="id" name="id" value={snackForm.id} onChange={updateSnackForm} />
                        <input type="text" placeholder="name" name="name" value={snackForm.name} onChange={updateSnackForm} />
                        <input type="text" placeholder="description" name="description" value={snackForm.description} onChange={updateSnackForm} />
                        <input type="text" placeholder="recipe" name="recipe" value={snackForm.recipe} onChange={updateSnackForm} />
                        <input type="text" placeholder="serve" name="serve" value={snackForm.serve} onChange={updateSnackForm} />
                        <button>Submit</button>
                    </form>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                        Add Drink
                    </CardTitle>
                    <form onSubmit={addDrink}>
                        <input type="text" placeholder="id" name="id" value={drinkForm.id} onChange={updateDrinkForm} />
                        <input type="text" placeholder="name" name="name" value={drinkForm.name} onChange={updateDrinkForm} />
                        <input type="text" placeholder="description" name="description" value={drinkForm.description} onChange={updateDrinkForm} />
                        <input type="text" placeholder="recipe" name="recipe" value={drinkForm.recipe} onChange={updateDrinkForm} />
                        <input type="text" placeholder="serve" name="serve" value={drinkForm.serve} onChange={updateDrinkForm} />
                        <button>Submit</button>
                    </form>
                </CardBody>
            </Card>
        </section>
    );
}

export default AddItem;
