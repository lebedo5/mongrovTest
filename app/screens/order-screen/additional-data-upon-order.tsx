import { observer } from "mobx-react-lite"
import { Checkbox, Divider, Input } from "../../components"
import { Dimensions, StyleSheet, View } from "react-native"
import { size } from "app/utils/size"
import { palette } from "../../theme/palette"
import { useState } from "react"

const { width } = Dimensions.get("window")

interface AdditionalDataUponOrderProps {
  additionalService?: object | null
  onChange?(string, string, boolean): void | null
}

export const AdditionalDataUponOrder = observer(({ additionalService, onChange }: AdditionalDataUponOrderProps) => {
  const styles = fromStyles()
  const [additionalServiceLoader, setAdditionalServiceLoader] = useState<boolean>(false)
  const [additionalServiceForwarder, setAdditionalServiceForwarder] = useState<boolean>(false)
  const toggleServiceLoader = () => setAdditionalServiceLoader(!additionalServiceLoader)
  const toggleServiceForwarder = () => setAdditionalServiceForwarder(!additionalServiceForwarder)

  return (
    <View style={styles.blockStyle}>
      <Checkbox value={additionalServiceForwarder} onToggle={toggleServiceForwarder} text={"Послуга експедитора"} />
      <Divider size={25} />
      <Checkbox value={additionalServiceLoader} onToggle={toggleServiceLoader} text={"Послуга грузчиків"} />
      {additionalServiceLoader ? <View style={styles.serviceBlock}>
        <Input
          value={additionalService?.numberLoader}
          onChange={(value) => onChange(value, "numberLoader", false)}
          label={"Кількість грузчиків"}
          placeholder={"2"}
          inputStyle={styles.inputContainer}
        />
        <Divider direction={"vertical"} size={20} />
        <Input
          value={additionalService?.time}
          onChange={(value) => onChange(value, "time", false)}
          label={"Зайнятість"}
          placeholder={"2 години"}
          inputStyle={styles.inputContainer}
        />
      </View> : null}
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
    serviceBlock: {
      flexDirection: "row",
      paddingTop: size(20)
    },
    inputContainer: {
      borderBottomColor: palette.purple,
      borderColor: "transparent",
      borderWidth: size(1),
      paddingBottom: size(5),
      width: (width - size(38)) / 2.5,
    }
  });
