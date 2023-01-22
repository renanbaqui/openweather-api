import React, { useState, useEffect } from "react";
import {
  ComboBox,
  ComboBoxItem,
  List,
  StandardListItem,
} from "@ui5/webcomponents-react";

export function MyApp() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("https://ektlvbuc67.execute-api.us-east-1.amazonaws.com/events")
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.log(error));
  }, []);

  const [listItemDisplay, setListItemDisplay] = useState("");

  const handleSelectionChange = (event) => {
    let objectIndex = null;
    for (let i = 0; i < apiData.length; i++) {
      if (apiData[i].EventId === event.target.value) {
        objectIndex = i;
        break;
      }
    }
    setListItemDisplay(apiData[objectIndex]);
  };

  return (
    <>
      <ComboBox
        onInput={function noRefCheck() {}}
        onSelectionChange={handleSelectionChange}
        placeholder="Select EventId"
      >
        {apiData.map((item, index) => (
          <ComboBoxItem key={index} text={item.EventId} />
        ))}
      </ComboBox>
      <p></p>
      <List
        headerText="Object Properties List"
        onItemClick={function noRefCheck() {}}
        onItemClose={function noRefCheck() {}}
        onItemDelete={function noRefCheck() {}}
        onItemToggle={function noRefCheck() {}}
        onLoadMore={function noRefCheck() {}}
        onSelectionChange={function noRefCheck() {}}
      >
        <StandardListItem additionalText="Event Id">
          {listItemDisplay.EventId}
        </StandardListItem>
        <StandardListItem additionalText="Title">
          {listItemDisplay.Title}
        </StandardListItem>
        <StandardListItem additionalText="Channel Id">
          {listItemDisplay.ChannelId}
        </StandardListItem>
        <StandardListItem additionalText="Description">
          {listItemDisplay.Description}
        </StandardListItem>
        <StandardListItem additionalText="Start Time">
          {listItemDisplay.StartTime}
        </StandardListItem>
        <StandardListItem additionalText="End Time">
          {listItemDisplay.EndTime}
        </StandardListItem>
      </List>
    </>
  );
}
