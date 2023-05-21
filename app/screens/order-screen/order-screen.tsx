import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet } from "react-native"
import { Button, Divider, Header, Screen } from "app/components"
import { DownloadData } from "./download-data"
import { size } from "app/utils/size"
import { AdditionalDataUponOrder } from "./additional-data-upon-order"
import { ContactDetailsCarrier } from "./contact-details-carrier"
import { Payment } from "./payment"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { KEY_GOOGLE_API } from "../../consts/consts"
import { decode } from "@mapbox/polyline";
import { totalDistance } from "../../utils/distance-between-two-points"
import { getLongitudeDelta } from "../../utils/map"

const circumference = 40075
const oneDegreeOfLatitudeInMeters = 111.32
export const OrderScreen = observer(function OrderScreen() {
  const navigation = useNavigation()
  const styles = fromStyles();
  const { bottom } = useSafeAreaInsets();
  const [userData, updateUserData] = useState<object>({
    lastName: null,
    name: null,
    surname: null,
    number: null
  });

  const [additionalService, setAdditionalService] = useState<object>({
    numberLoader: null,
    time: null
  });

  const [downloadData, setDownloadData] = useState<object | null>(null)
  const [unloadData, setUnloadData] = useState<object | null>(null)

  const [coords, setCoords] = useState([]);
  const [fullDistance, setFullDistance] = useState<number>(0)
  const [region, setRegion] = useState<object | null>(null)

  const getDistance = (coordsValue) => {
    const val = totalDistance(coordsValue)
    setFullDistance(val)
    const angularDistance = val/circumference

    const latDelta = Math.abs(val / oneDegreeOfLatitudeInMeters)
    const lngDelta = getLongitudeDelta(downloadData?.location?.lat, angularDistance)

    setRegion({
      latitude: downloadData?.location?.lat,
      longitude: downloadData?.location?.lng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta
    })
  }

  const getDirections = async (startLoc , destinationLoc ) => {
    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY_GOOGLE_API}`
      );

      const respJson = await resp.json();
      const points = decode(respJson?.routes[0]?.overview_polyline.points);

      const coords = points.map((point) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      return coords;
    } catch (error) {
      return console.log("Fetch point", error);
    }
  };

  const onChange = async (value, key, userUpdate) => {
    const copy = Object.assign({}, userUpdate ? userData : additionalService);
    copy[key] = value;
    if(userUpdate) {
      updateUserData(copy);
    } else {
      setAdditionalService(copy)
    }
  };

  const recordsUploadPlace = async (value) => {
    setDownloadData(value)

    if(unloadData) {
      const data = await getDirections(`${value?.location?.lat}, ${value?.location?.lng}`,
        `${unloadData?.location?.lat}, ${unloadData?.location?.lng}`)

      setCoords(data)
      getDistance(data)
    }
  }

  const recordsPlaceOfDispatch = async (value) => {
    setUnloadData(value)

    if(downloadData) {
      const data = await getDirections(`${downloadData?.location?.lat}, ${downloadData?.location?.lng}`,
        `${value?.location?.lat}, ${value?.location?.lng}`)

      setCoords(data)
      getDistance(data)
    }
  }

  const goToOrderData = () => {
    navigation.navigate("OrderData", { userData, additionalService, region, fullDistance, coords })
  }

  return (
    <>
      <Header headerText={"Замовити"} />
      <Screen style={styles.wrap} preset="scroll">
        <Divider size={45}/>
        <DownloadData onPress={recordsUploadPlace} titleBlock={"Загрузка"} />
        <Divider size={20} />
        <DownloadData onPress={recordsPlaceOfDispatch} titleBlock={"Вигрузка"} />
        <Divider size={20} />
        <AdditionalDataUponOrder additionalService={additionalService} onChange={onChange} />
        <Divider size={20} />
        <ContactDetailsCarrier userData={userData} onChange={onChange} />
        <Divider size={20} />
        <Payment />
        <Divider size={16}/>
        <Button onPress={goToOrderData} text={"Далі"} />
        <Divider size={bottom} />
      </Screen>
    </>
  )
})

const fromStyles = () =>
  StyleSheet.create({
    wrap: {
      paddingHorizontal: size(20)
    },
  });
