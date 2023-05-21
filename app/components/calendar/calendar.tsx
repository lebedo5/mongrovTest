import React from "react"
import { Alert, Dimensions, FlatList, Modal, Pressable, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import { fontSize, size } from "app/utils/size"
import { useCalendar } from "../../utils/calendar/useCalendar"
import { checkIsToday } from "../../utils/calendar/checkIsToday"
import { checkDateIsEqual } from "../../utils/calendar/checkDateIsEqual"
import { palette } from "../../theme/palette"
import { BackIcon } from "../../assets/icons/back-icon"
import { Divider } from "../divider/divider"
import { RightIcon } from "../../assets/icons/right-icon"
import { Button } from "../button/button"

const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

interface CalendarProps {
  locale?: string;
  selectedDate: Date | null;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
  isVisible: boolean;
  onClose(): void
}

const { width } = Dimensions.get("window")

  export const Calendar = observer(({
     locale = 'default',
     selectedDate: date,
     selectDate,
     firstWeekDayNumber = 2,
     isVisible,
     onClose
   }: CalendarProps) => {

  const styles = fromStyles()

  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber
  });

  return (
    <Modal
      visible={isVisible}
      animationType={"fade"}
      transparent={true}
    >
      <Pressable onPress={onClose} style={styles.viewModal}>
        <View style={styles.calendar}>
          <View style={styles.calendarHeader}>
            <Pressable onPress={() => functions.onClickArrow('left')}>
              <BackIcon color={palette.white} />
            </Pressable>
            {state.mode === 'days' && (
              <Pressable onPress={() => functions.setMode('monthes')}>
                <Text style={styles.headerTitle}>{state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}</Text>
              </Pressable>
            )}
            {state.mode === 'monthes' && (
              <Pressable onPress={() => functions.setMode('years')}>
                <Text style={styles.headerTitle}>{state.selectedYear}</Text>
              </Pressable>
            )}
            {state.mode === 'years' && (
              <Pressable onPress={() => functions.setMode('days')}>
                <Text style={styles.headerTitle}>{state.selectedYearsInterval[0]} -{' '}
                  {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}</Text>
              </Pressable>
            )}
            <Pressable onPress={() => functions.onClickArrow('right')}>
              <RightIcon color={palette.white} />
            </Pressable>
          </View>
          <View style={styles.additionalButtons}>
            <Pressable style={styles.additionalButton} onPress={() => functions.setMode('monthes')}>
              <Text style={styles.additionalButtonText} text={"Month"} />
            </Pressable>
            <Pressable style={styles.additionalButton} onPress={() => functions.setMode('years')}>
              <Text style={styles.additionalButtonText} text={"Year"} />
            </Pressable>
          </View>
          <Divider size={10} />
          <View >
            {state.mode === 'days' && (
              <>
                <View style={styles.flexRow} >
                  {state.weekDaysNames.map((weekDaysName) => (
                    <View style={styles.calendarDay} key={weekDaysName.dayShort}>
                      <Text text={weekday[weekDaysName.dayShort]} />
                    </View>
                  ))}
                </View>
                <Divider size={10} />
                <View>
                  <FlatList
                    data={state.calendarDays}
                    numColumns={7}
                    renderItem={({ item: day }) => {
                      const isToday = checkIsToday(day.date);
                      const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                      const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                      return (
                        <Pressable
                          key={`${day.dayNumber}-${day.monthIndex}`}
                          onPress={() => {
                            functions.setSelectedDay(day);
                            selectDate(day.date);
                          }}
                          style={[styles.calendarDay,
                            isToday ? styles.calendarTodayItem : null,
                            isSelectedDay ? styles.calendarSelectedItem : null,
                          ]}
                        >
                          <Text style={[isAdditionalDay ? styles.calendarAdditionalDay : styles.textStyle, isSelectedDay ? styles.selectedItemText : null]} text={day.dayNumber}/>
                        </Pressable>
                      )
                    }}
                  />
                </View>
              </>
            )}

            {state.mode === 'monthes' && (
              <FlatList
                data={state.monthesNames}
                numColumns={3}
                renderItem={({ item: monthesName }) => {
                  const isCurrentMonth =
                    new Date().getMonth() === monthesName.monthIndex &&
                    state.selectedYear === new Date().getFullYear();
                  const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

                  return (
                    <Pressable
                      key={monthesName.month}
                      onPress={() => {
                        functions.setSelectedMonthByIndex(monthesName.monthIndex);
                        functions.setMode('days');
                      }}
                      style={[styles.calendarMonth,
                        isCurrentMonth ? styles.calendarTodayItem : null,
                        isSelectedMonth ? styles.calendarSelectedItem : null
                      ]}
                    >
                      <Text style={[styles.monthText, isSelectedMonth ? styles.selectedItemText : null]} text={monthesName.monthShort} />
                    </Pressable>
                  );
                }}
              />
            )}

            {state.mode === 'years' && (
              <FlatList
                data={state.selectedYearsInterval}
                numColumns={5}
                renderItem={({ item: year }) => {
                  const isCurrentYear = new Date().getFullYear() === year;
                  const isSelectedYear = year === state.selectedYear;

                  return (
                    <Pressable
                      key={year}
                      onPress={() => {
                        functions.setSelectedYear(year);
                        functions.setMode('monthes');
                      }}
                      style={[styles.calendarYear,
                        isCurrentYear ? styles.calendarTodayItem : null,
                        isSelectedYear ? styles.calendarSelectedItem : null
                      ]}
                    >
                      <Text style={[styles.yearText, isSelectedYear ? styles.selectedItemText : null]} text={year} />
                    </Pressable>
                  );
                }}
              />
            )}
          </View>
        </View>
        <>
          <Divider size={20} />
          <Button onPress={onClose} text={"Вибрати дату і закрити"} />
        </>
      </Pressable>
    </Modal>
  );
})

const fromStyles = () =>
  StyleSheet.create({
    viewModal: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: palette.backDrop
    },
    additionalButton: {
      alignItems: "center",
      backgroundColor: palette.lightGray,
      justifyContent: "center",
      width: (width - size(40)) /2
    },
    additionalButtonText: {
      fontSize: fontSize(14) ,
      paddingVertical: size(10),
      fontWeight: "500"
    },
    calendar: {
      borderRadius: size(5),
      textTransform: "capitalize",
      width: "100%",
      paddingBottom: size(20),
      backgroundColor: palette.white,
      borderTopLeftRadius: size(5),
      overflow: "hidden",
      width: width - size(40)
    },
    calendarAdditionalDay: {
      fontWeight: "300",
      paddingVertical: size(5.5)
    },
    calendarAdditionalDay: {
      color: palette.separatorTextColor,
      fontWeight: "400",
      paddingVertical: size(10)
    },
    calendarDay: {
      alignItems: "center",
      justifyContent: "center",
      width: (width -size(40)) / 7
    },
    calendarHeader: {
      alignItems: "center",
      backgroundColor: palette.purple,
      color: palette.textColor,
      flexDirection: "row",
      height: size(50),
      justifyContent: "space-between",
      padding: size(10),
      position: "relative",
      width: "100%",
    },
    calendarMonth: {
      alignItems: "center",
      justifyContent: "center",
      width: (width - size(40)) / 3
    },
    calendarYear: {
      alignItems: "center",
      justifyContent: "center",
      width: (width - size(40)) / 5
    },
    calendarPickItem: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      paddingVertical: size(9)
    },
    calendarSelectedItem: {
      backgroundColor: palette.purple,
      borderRadius: size(5),
      color: palette.textColor
    },
    selectedItemText: {
      color: palette.white
    },
    calendarTodayItem: {
      backgroundColor: palette.lightPurple,
      borderRadius: size(5)
    },
    textStyle: {
      color: palette.textColor,
      fontSize: size(14),
      fontWeight: "600",
      paddingVertical: size(10)
    },
    headerTitle: {
      color: palette.white,
      fontWeight: "600"
    },
    additionalButtons: {
      flexDirection: "row",
      borderBottomLeftRadius: size(5),
      borderBottomRightRadius: size(5),
      overflow: "hidden"
    },
    flexRow: { flexDirection: "row" },
    monthText: {
      padding: size(10),
      fontSize: size(14),
      fontWeight: "600",
      paddingVertical: size(10)
    },
    yearText: { padding: size(10), fontWeight: "500" }
  })
