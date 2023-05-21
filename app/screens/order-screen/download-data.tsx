import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Calendar, Divider, Input, Text } from "../../components"
import { Dimensions, StyleSheet, View } from "react-native"
import { fontSize, size } from "../../utils/size"
import { palette } from "../../theme/palette"
import { CalendarIcon } from "../../assets/icons/calendar"
import { format } from "date-fns"
import { GooglePlacesInput } from "app/components/google-place-input/google-place-input"

const { width } = Dimensions.get("window")

interface DownloadDataProps {
  titleBlock?: string
  onPress(any): void
}

export const DownloadData = observer(({ titleBlock, onPress }: DownloadDataProps) => {
  const styles = fromStyles()

  const [selectedDate, setSelectedDay] = useState();
  const [showCalendar, setShowCalendar] = useState(false)

  const toggleCalendarModal = () => setShowCalendar(!showCalendar)

  return (
    <View style={styles.blockStyle}>
      <Text style={styles.title} text={titleBlock} />
      <Divider size={10} />
      <Text style={styles.subTitle} text={"Місце"} />
      <Divider size={10} />
      <GooglePlacesInput
        filterType={['country']}
        optionTypes={'(regions)'}
        label={"Країна"}
        placeholder={"Україна"}
        onPress={onPress}
      />
      <Divider size={10} />
      <GooglePlacesInput
        filterType={['locality', 'administrative_area_level_3']}
        optionTypes={'(regions)'}
        label={"Область"}
        placeholder={"Київська"}
        onPress={onPress}
      />
      <Divider size={10} />
      <GooglePlacesInput
        filterType={['locality', 'administrative_area_level_3']}
        optionTypes={'(cities)'}
        label={"Місто"}
        placeholder={"Київ"}
        onPress={onPress}
      />
      <Divider size={10} />
      <GooglePlacesInput
        optionTypes={'address'}
        label={"Адреса"}
        filterType={['locality', 'administrative_area_level_3']}
        onPress={onPress}
        placeholder={"Антоновича, 176"}
      />
      <Divider size={20} />
      <Text style={styles.subTitle} text={"Дата і час прибуття"} />
      <Divider size={10} />
      <View style={styles.datePickerBlock}>
        <Input
          value={selectedDate ? format(selectedDate, "dd.MM.yy") : ""}
          label={"Дата"}
          placeholder={"25.10.22 - 01.11.22"}
          icon={<CalendarIcon />}
          onPressIcon={toggleCalendarModal}
          inputStyle={styles.inputContainer}
        />
        <Input
          inputStyle={styles.timeInputContainer}
          label={"Час"}
          placeholder={"12 : 00"}
        />
      </View>
      <Divider size={20} />
      <Calendar
        isVisible={showCalendar}
        onClose={toggleCalendarModal}
        selectedDate={selectedDate}
        selectDate={(date) => setSelectedDay(date)}
      />
    </View>
  )
})


const fromStyles = () =>
  StyleSheet.create({
    blockStyle: {
      borderBottomColor: palette.tineGray,
      borderBottomWidth: size(1)
    },
    datePickerBlock: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    inputContainer: {
      borderBottomColor: palette.purple,
      borderColor: "transparent",
      borderWidth: size(1),
      paddingBottom: size(5),
      width: (width - size(38)) / 2
    },
    label: {
      fontSize: fontSize(14),
      fontWeight: "500",
      lineHeight: size(17)
    },
    subTitle: {
      color: palette.textColor,
      fontSize: fontSize(16),
      fontWeight: "600",
      lineHeight: size(20)
    },
    timeInputContainer: {
      borderBottomColor: palette.purple,
      borderColor: "transparent",
      borderWidth: size(1),
      paddingBottom: size(5),
      width: (width - size(38)) / 5,
    },
    title: {
      color: palette.purple,
      fontSize: fontSize(20),
      fontWeight: "700",
      lineHeight: size(25),
    },
    wrap: {
      flex: 1,
      paddingHorizontal: size(20)
    }
  });
