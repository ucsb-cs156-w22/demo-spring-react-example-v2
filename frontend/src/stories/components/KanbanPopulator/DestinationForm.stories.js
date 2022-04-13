import React from 'react';

import DestinationForm from "main/components/KanbanPopulator/DestinationForm"

export default {
    title: 'components/KanbanPopulator/DestinationForm',
    component: DestinationForm
};


const Template = (args) => {
    return (
        <DestinationForm {...args} />
    )
};

export const Default = Template.bind({});