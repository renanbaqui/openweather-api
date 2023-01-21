import React, { useState, useEffect } from 'react';
import {
    ComboBox,
    ComboBoxItem,
    List,
    StandardListItem
} from "@ui5/webcomponents-react";

export function MyApp() {

    let [apiData, setApiData] = useState(null)

    useEffect(() => {
        fetch("https://ektlvbuc67.execute-api.us-east-1.amazonaws.com/events")
            .then(response => response.json())
            .then(data => setApiData(data))
    }, [])

    return (
        <ComboBox

            onInput={function noRefCheck() { }}
            onSelectionChange={function noRefCheck() { }}
            placeholder="Select Title"
        >
            <ComboBoxItem text={apiData[0].Title} />
            <ComboBoxItem text={apiData[1].Title} />
            <ComboBoxItem text={apiData[2].Title} />
            <ComboBoxItem text={apiData[3].Title} />
            <ComboBoxItem text={apiData[4].Title} />
            <ComboBoxItem text={apiData[5].Title} />
            <ComboBoxItem text={apiData[6].Title} />
        </ComboBox>
    );
}

export function MyApp2() {

    return (<List
        headerText="List with Object Properties"
        onItemClick={function noRefCheck() { }}
        onItemClose={function noRefCheck() { }}
        onItemDelete={function noRefCheck() { }}
        onItemToggle={function noRefCheck() { }}
        onLoadMore={function noRefCheck() { }}
        onSelectionChange={function noRefCheck() { }}
    >
        <StandardListItem additionalText="3">
            Title
        </StandardListItem>
        <StandardListItem additionalText="2">
            Channel
        </StandardListItem>
        <StandardListItem additionalText="1">
            Description
        </StandardListItem>
    </List>);
}

