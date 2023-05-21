import React, { useEffect, useMemo, useRef } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, Image, Dimensions } from "react-native"
import { Button, Divider, Header, Screen, Text } from "app/components"
import { fontSize, size } from "../../utils/size"
import { CheckIcon } from "../../assets/icons/check-icon"
import { StarIcon } from "../../assets/icons/star-icon"
import { ViewIcon } from "../../assets/icons/view-icon"
import { palette } from "../../theme/palette"
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps"
import { useRoute } from "@react-navigation/native"
import { KEY_GOOGLE_API } from "../../consts/consts"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CustomMapStyle } from "../../consts/CustomMapStyle"

const angarImage = require("./angar.png")
const { width } = Dimensions.get("window")

export const OrderDataScreen = observer(function OrderDataScreen() {
  const styles = fromStyles();
  const mapRef = useRef()
  const { bottom } = useSafeAreaInsets();
  const { params: { userData, additionalService, fullDistance, region, coords } } = useRoute()

  const calculatePrice = useMemo(() => {
    const routePrice = fullDistance * 20
    const additionalServ = additionalService.numberLoader * additionalService.time * 100
    const additionalServForwarder = 2000
    const supplyOfTransport = 2000
    const fullPrice = routePrice + additionalServ + additionalServForwarder + supplyOfTransport
    return {
      routePrice,
      additionalServ,
      additionalServForwarder,
      supplyOfTransport,
      fullPrice
    }
  }, [fullDistance, additionalService])

  const animatioToStartPoint = () => {
    mapRef?.root?.animateToRegion(region, 2000)
  }

  useEffect(() => {
    animatioToStartPoint()
  }, []);

  return (
    <>
      <Header headerText={"Дані замовлення"} />
      <Screen style={styles.wrap} preset="scroll">
        <Divider size={11} />
        <View style={styles.topBlock}>
          <View style={styles.flexRow}>
            <View style={styles.imageBlock}>
              <Image source={angarImage} />
              <View style={styles.advertisedBlock}>
                <Text style={styles.advertisedText} text={"Рекламовано"} />
              </View>
              <Divider size={2} />
              <View style={styles.checkedLabelBlock}>
                <Text style={styles.checkedLabelText} text={"Перевірено"} />
              </View>
              <View style={styles.iconBlock}>
                <CheckIcon />
              </View>
            </View>
            <Divider direction={"vertical"} size={10}/>
            <View style={styles.descriptionBlock}>
              <View style={styles.blockText}>
                <Text style={styles.carType} text={"Грузовоз"}/>
                <Text style={styles.dayDispatch} text={"22.02.2022"} />
              </View>
              <Divider size={5}/>
              <View style={styles.blockText}>
                <View style={styles.blockText}>
                  <Text style={styles.price} text={"300 грн/кв.м."}/>
                  <Text style={styles.salePrice} text={"200"} />
                </View>
                <View style={styles.blockText}>
                  <StarIcon />
                  <Text style={styles.driverLevel} text={"4.8"} />
                </View>
              </View>
              <Divider size={5}/>
              <View style={styles.blockText}>
                <Text style={styles.minPrice} text={"min 200 грн/кг"}/>
                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                  <ViewIcon />
                  <Divider direction={"vertical"} size={3} />
                  <Text style={styles.viewNumber} text={"12 тис."} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <Divider size={15} />
        <View style={styles.flexRow}>
          <View style={styles.blockWidth}>
            <Text style={styles.title} text={"Прізвище"} />
            <Text style={styles.subTitle} text={userData?.lastName || "-"} />
          </View>
          <View  style={styles.blockWidth}>
            <Text style={styles.title} text={"По-батькові"} />
            <Text style={styles.subTitle} text={userData?.surname || "-"} />
          </View>
        </View>
        <Divider size={10} />
        <View style={styles.flexRow}>
          <View style={styles.blockWidth}>
            <Text style={styles.title} text={"Ім’я"} />
            <Text style={styles.subTitle} text={userData?.name || "-"} />
          </View>
          <View style={styles.blockWidth}>
            <Text style={styles.title} text={"Номер телефону"} />
            <Text style={styles.subTitle}  text={userData?.number || "-"} />
          </View>
        </View>
        <Divider size={10} />
        <View style={styles.fullPriceBlock}>
          <Text style={styles.fullPrizeText} text={"Повна оплата"}/>
        </View>
        <Divider size={10} />
        <View style={styles.mapBackground}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            mapType={"standard"}
            scrollDuringRotateOrZoomEnabled={true}
            style={styles.mapView}
            customMapStyle={CustomMapStyle}
            initialRegion={region}
            showsScale={true}
          >
            {coords?.length > 0 &&
              <>
                <Circle
                  center={coords[0]}
                  radius={60}
                  strokeColor={palette.purple}
                  strokeWidth={18}
                  fillColor={palette.purple}
                  zIndex={1}
                />
                <Circle
                  center={coords[coords?.length - 1]}
                  radius={60}
                  strokeColor={palette.purple}
                  strokeWidth={18}
                  fillColor={palette.purple}
                  zIndex={1}
                />
                <MapViewDirections
                  origin={coords[0]}
                  destination={coords[coords?.length - 1]}
                  apikey={KEY_GOOGLE_API}
                  strokeWidth={3}
                  strokeColor={palette.purple}
                />
              </>
            }
          </MapView>
        </View>
        <Divider size={15} />
        <View style={styles.priceBlock}>
          <Text style={styles.label} text={"Подача транспотру"} />
          <Text style={styles.value}  text={`${calculatePrice.supplyOfTransport} грн`} />
        </View>
        <Divider size={10} />
        <View style={styles.priceBlock}>
          <Text numberOfLines={2} style={styles.label} text={"Маршрут загрузка - вигрузка"} />
          <Text style={styles.value}  text={`${calculatePrice.routePrice} грн`} />
        </View>
        <Divider size={10} />
        <View style={styles.priceBlock}>
          <Text style={styles.label} text={"Послуги експедитора"} />
          <Text style={styles.value}  text={`${calculatePrice.additionalServForwarder} грн`} />
        </View>
        <Divider size={10} />
        <View style={styles.priceBlockWithoutBorder}>
          <Text style={styles.label} text={"Послуги грузчиків"} />
          <Text style={styles.value}  text={`${calculatePrice.additionalServ} грн`} />
        </View>
        {additionalService.numberLoader && <>
          <Divider direction={"vertical"} size={10} />
          <View style={[styles.priceBlockWithoutBorder, styles.paddingLeft20]}>
            <Text style={styles.label}>
              {additionalService.numberLoader} {additionalService.numberLoader > 1 ? "грузчиків" : "грузчик"}
            </Text>
            <Text style={styles.value} text={"100 грн/год"} />
          </View>
          <View style={[styles.priceBlockWithoutBorder, styles.paddingLeft20]}>
            <Text style={styles.label} text={"Зайнятість"} />
            <Text style={styles.value}>
              {additionalService.time} {additionalService.time > 1 ? "години" : "година"}
            </Text>
          </View>
        </>}
        <Divider size={15} />
        <>
          <Text style={styles.calculateFullPriceTitle} text={"Повна ціна:"} />
          <Text style={styles.calculateFullPrice} text={`${calculatePrice.fullPrice}`} />
        </>
        <Divider size={15} />
        <Button text={"Оформити"} />
        <Divider size={bottom} />
      </Screen>
    </>
  )
})

const fromStyles = () =>
  StyleSheet.create({
    blockText: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    blockWidth: {
      width: (width - size(32)) / 2
    },
    calculateFullPrice: {
      color: palette.purple,
      fontSize: fontSize(20),
      fontWeight: "700",
      lineHeight: size(25)
    },
    calculateFullPriceTitle: {
      color: palette.iconColor,
      fontSize: fontSize(16),
      fontWeight: "700",
      lineHeight: size(20)
    },
    carType: {
      color: palette.textColor,
      fontSize: fontSize(14),
      fontWeight: "500",
      lineHeight: size(17)
    },
    dayDispatch: {
      color: palette.textColor,
      fontSize: fontSize(11),
      fontWeight: "300",
      lineHeight: size(13)
    },
    descriptionBlock: {
      flex: 1
    },
    driverLevel: {
      color: palette.textColor,
      fontSize: fontSize(14),
      fontWeight: "500",
      lineHeight: size(18)
    },
    flexRow: { flexDirection: "row" },
    fullPriceBlock: {
      alignItems: "center",
      backgroundColor: palette.lightPurple,
      borderRadius: size(5),
      justifyContent: "center",
      paddingVertical: size(15)
    },
    fullPrizeText: {
      color: palette.iconColor,
      fontSize: fontSize(20),
      fontWeight: "700",
      lineHeight: size(25)
    },
    iconBlock: {
      position: "absolute",
      right: size(-9),
      top: size(-9),
      zIndex: 99
    },
    imageBlock: {
      position: "relative"
    },
    label: {
      color: palette.textColor,
      fontSize: fontSize(16),
      fontWeight: "300",
      lineHeight: size(20),
    },
    mapBackground: {
      backgroundColor: palette.lightPurple,
      borderRadius: size(10),
      minHeight: size(330),
      padding: size(8),
    },
    mapView: {
      borderRadius: size(10),
      minHeight: size(330)
    },
    minPrice: {
      color: palette.textColor,
      fontSize: fontSize(12),
      fontWeight: "500",
      lineHeight: size(15)
    },
    paddingLeft20: { paddingLeft: size(20) },
    price: {
      color: palette.purple,
      fontSize: fontSize(16),
      fontWeight: "500",
      lineHeight: size(20)
    },
    priceBlock: {
      borderBottomColor: palette.tineGray,
      borderBottomWidth: size(1),
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: size(10)
    },
    priceBlockWithoutBorder: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: size(10),
    },
    salePrice: {
      color: palette.red,
      fontSize: fontSize(12),
      lineHeight: size(15),
      textDecorationLine: 'line-through'
    },
    subTitle: {
      color: palette.textColor,
      fontSize: fontSize(16),
      fontWeight: "300",
      lineHeight: size(20)
    },
    title: {
      color: palette.textColor,
      fontSize: fontSize(14),
      fontWeight: "500",
      lineHeight: size(18)
    },
    topBlock: { flex: 1 },
    value: {
      color: palette.textColor,
      fontSize: fontSize(16),
      fontWeight: "500",
      lineHeight: size(20)
    },
    viewNumber: {
      color: palette.textColor,
      fontSize: fontSize(12),
      fontWeight: "500",
      lineHeight: size(15)
    },
    wrap: {
      paddingHorizontal: size(20)
    },
    advertisedBlock: {
      position: "absolute",
      top: size(4),
      left: size(4),
      zIndex: 99,
      paddingVertical: size(3),
      paddingHorizontal: size(5),
      borderRadius: size(3),
      backgroundColor: palette.lightGray
    },
    advertisedText: {
      color: palette.purple,
      fontSize: fontSize(8),
      fontWeight: "700"
    },
    checkedLabelBlock: {
      position: "absolute",
      top: size(22),
      left: size(4),
      zIndex: 99,
      paddingVertical: size(3),
      paddingHorizontal: size(5),
      borderRadius: size(3),
      backgroundColor: palette.greenLight
    },
    checkedLabelText: {
      color: palette.white,
      fontSize: fontSize(8),
      fontWeight: "700"
    }
  });
