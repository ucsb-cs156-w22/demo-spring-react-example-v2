import React from 'react';

import SourceForm from "main/components/KanbanPopulator/SourceForm"

export default {
    title: 'components/KanbanPopulator/SourceForm',
    component: SourceForm
};


const Template = (args) => {
    return (
        <SourceForm {...args} />
    )
};

export const Default = Template.bind({});