import { observer } from "mobx-react-lite"
import { Pressable, StyleSheet, View } from "react-native"
import { Checkbox, Divider, Text } from "../../components"
import { fontSize, size } from "../../utils/size"
import { palette } from "../../theme/palette"
import React, { useState } from "react"

const paymentType = [
  {
    title: "Повна",
    default: true
  },
  {
    title: "Частинами",
  },
  {
    title: "Через MOOW",
    disabled: true
  },

]
export const Payment = observer(() => {
  const styles = fromStyles();

  const [selectedPayment, setSelectedPayment] =useState<number | null>(null);

  return (
    <View>
      <Text style={styles.title} text={"Оплата"} />
      <Divider size={15} />
      {paymentType.map((item, index) => (
        <View key={index.toString()}>
          <Pressable hitSlop={20} onPress={item.disabled ? null : () => setSelectedPayment(index)} style={[styles.paymentItem, item.disabled ? styles.disableItem : styles.activeItem]}>
            <View style={styles.radioButtonBlock}>
              <View style={selectedPayment === index || item.default && !selectedPayment  ? styles.activeRadioButton : null}/>
            </View>
            <Divider direction={"vertical"} size={20} />
            <Text style={styles.value} text={item.title} />
          </Pressable>
          <Divider size={15} />
        </View>
      ))}

    </View>
  )
})

const fromStyles = () =>
  StyleSheet.create({
    activeItem: {
      backgroundColor: palette.lightPurple,
    },
    disableItem: {
      backgroundColor: palette.lightGray2
    },
    paymentItem: {
      alignItems: "center",
      borderRadius: size(5),
      flexDirection: "row",
      padding: size(15)
    },
    radioButtonBlock: {
      borderColor: palette.gray,
      borderRadius: size(24),
      borderWidth: size(2),
      height: size(24),
      width: size(24)
    },
    title: {
      color: palette.purple,
      fontSize: fontSize(20),
      fontWeight: "700",
      lineHeight: size(25),
    },
    value: {
      color: palette.iconColor,
      fontSize: fontSize(16),
      fontWeight: "700",
      lineHeight: size(20)
    },
    activeRadioButton: {
      backgroundColor: palette.purple,
      borderRadius: size(24),margin: size(1),
      flex: 1,
    }
  });
