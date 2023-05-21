import { observer } from "mobx-react-lite"
import { Dimensions, StyleSheet, View } from "react-native"
import { palette } from "../../theme/palette"
import { fontSize, size } from "../../utils/size"
import { Divider, Input, Text } from "../../components"
import { MaskedTextInput } from "react-native-mask-text"

const { width } = Dimensions.get("window")

interface ContactDetailsCarrierProps {
  userData: object
  onChange?(string, string, boolean): void | null
}

export const ContactDetailsCarrier = observer(({ userData, onChange }: ContactDetailsCarrierProps) => {
  const styles = fromStyles()

  return (
    <View style={styles.blockStyle}>
      <Text style={styles.title} text={"Контактні дані"} />
      <Divider size={15} />
      <Input
        value={userData?.lastName}
        onChange={(value) => onChange(value, "lastName", true)}
        label={"Прізвище"}
        placeholder={"Валунов"}
        inputStyle={styles.inputContainer}
      />
      <Divider size={15} />
      <Input
        value={userData?.name}
        onChange={(value) => onChange(value, "name", true)}
        label={"Ім’я"}
        placeholder={"Валентин"}
        inputStyle={styles.inputContainer}
      />
      <Divider size={15} />
      <Input
        value={userData?.surname}
        onChange={(value) => onChange(value, "surname", true)}
        label={"По-батькові"}
        placeholder={"Валерійович"}
        inputStyle={styles.inputContainer}
      />
      <Divider size={15} />
      <Text text={"Номер телефону"} />
      <Divider size={3} />
      <MaskedTextInput
        placeholder="+38 (097) 333 3333"
        mask="+38 (099) 999 9999"
        onChangeText={(value) => onChange(value, "number", true)}
        keyboardType="numeric"
        style={styles.inputPhoneContainer}
        placeholderTextColor={palette.separatorTextColor}
      />
      <Divider size={20} />
    </View>
  )
})

const fromStyles = () =>
  StyleSheet.create({
    blockStyle: {
      borderBottomColor: palette.tineGray,
      borderBottomWidth: size(1)
    },
    inputContainer: {
      borderBottomColor: palette.purple,
      borderColor: "transparent",
      borderWidth: size(1),
      paddingBottom: size(5),
      width: width - size(38)
    },
    inputPhoneContainer: {
      borderBottomColor: palette.purple,
      borderColor: "transparent",
      borderWidth: size(1),
      fontSize: size(14),
      color: palette.iconColor,
      paddingBottom: size(5),
      width: width - size(38)
    },
    title: {
      color: palette.purple,
      fontSize: fontSize(20),
      fontWeight: "700",
      lineHeight: size(25),
    },
  });
