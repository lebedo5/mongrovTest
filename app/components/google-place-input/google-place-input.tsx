import { Text } from "../text/text"
import { Divider } from "../divider/divider"
import { AutocompleteRequestType, GooglePlacesAutocomplete, PlaceType } from "react-native-google-places-autocomplete"
import { palette } from "../../theme/palette"
import { DownArrow } from "../../assets/icons/down-arrow"
import React from "react"
import { StyleSheet } from "react-native"
import { KEY_GOOGLE_API } from "../../consts/consts"
import { size } from "app/utils/size"

interface GooglePlacesInputProps {
  placeholder: string,
  label?: string
  onPress: (item: any) => void
  optionTypes?: AutocompleteRequestType
  filterType?: PlaceType[]
}

export const GooglePlacesInput = ({
    placeholder,
    label,
    onPress,
    optionTypes,
    filterType,
  }: GooglePlacesInputProps) => {

  const styles = fromStyles()

  return (
    <>
      <Text text={label}/>
      <Divider size={3} />
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        keepResultsAfterBlur={true}
        styles={{
          textInputContainer: styles.inputContainer,
          textInput: styles.container
        }}
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true}
        renderRightButton={() => <DownArrow />}
        filterReverseGeocodingByTypes={filterType}
        onPress={(data, details = null) => {
          onPress(details?.geometry)
        }}
        query={{
          key: KEY_GOOGLE_API,
          language: 'uk',
          types: optionTypes,
        }}
      />
    </>
  );
};
const fromStyles = () =>
  StyleSheet.create({
    container: {
      borderBottomColor: palette.purple,
      borderBottomWidth: size(2),
      borderRadius: 0,
    },
    inputContainer: { alignItems: "center"}
  })
