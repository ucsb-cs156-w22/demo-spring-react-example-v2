import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function StudentForm({ initialStudent, submitAction, buttonLabel="Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialStudent || {}, }
    );
    // Stryker enable all

    const navigate = useNavigate();

    // Stryker disable next-line all
    const perm_regex = /^\d{7}$/i; // Accepts all inputs with exactly 7 digits

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialStudent && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="StudentForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialStudent.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control
                    data-testid="StudentForm-firstName"
                    id="firstName"
                    type="text"
                    isInvalid={Boolean(errors.firstName)}
                    {...register("firstName", { required: true })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.quarterYYYYQ && 'First Name is required. '}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Control
                    data-testid="StudentForm-lastName"
                    id="name"
                    type="text"
                    isInvalid={Boolean(errors.lastName)}
                    {...register("name", {
                        required: "Last Name is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="perm">Perm (7 digits)</Form.Label>
                <Form.Control
                    data-testid="StudentForm-perm"
                    id="perm"
                    type="text"
                    isInvalid={Boolean(errors.perm)}
                    {...register("perm", { required: true, pattern: perm_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.perm && 'Perm is required. '}
                    {errors.perm?.type === 'pattern' && 'perm must be seven digits, no hyphens'}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid="StudentForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="StudentForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default StudentForm;
