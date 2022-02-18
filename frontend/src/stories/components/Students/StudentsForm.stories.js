import React from 'react';

import StudentForm from "main/components/Students/StudentForm"
import { studentFixtures } from 'fixtures/studentFixtures';

export default {
    title: 'components/Students/StudentForm',
    component: StudentForm
};


const Template = (args) => {
    return (
        <StudentForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    ucsbDate: studentFixtures.oneStudent,
    submitText: "",
    submitAction: () => { }
};
