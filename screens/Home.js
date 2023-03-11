import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';

import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {getHoldings, getCoinMarket} from '../store/market/markeActions';
import {SIZES, COLORS, FONTS, dummyData, icons} from '../constants';
import {BalanceInfo, IconTextButton} from '../components';
import {MainLayout} from './';
const Home = ({getHoldings, getCoinMarket, myHoldings, coins, userData}) => {
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  // let theme = userData.Appearance;
  let theme = 'white';
  useFocusEffect(
    React.useCallback(() => {
      getHoldings(dummyData.holdings);
      getCoinMarket();
    }, []),
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingTop: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,

          backgroundColor: theme == 'White' ? COLORS.white : COLORS.gray,
        }}>
        {/* Balance Info */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet.toFixed(3)}
          changePct={percChange}
          containerStyle={{
            marginTop: 50,
          }}
        />

        {/* buttons */}
        <View
          style={{
            flexDirection: 'row',
            // marginTop: 10s,
            marginBottom: -15,
            backgroundColor: 'black',
            paddingHorizontal: SIZES.radius,
          }}>
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              backgroundColor: 'gray',
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log('Transfer')}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => {
              console.log('withdraw');
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: theme == 'White' ? COLORS.white : COLORS.black,
        }}>
        {/* Header- Wallet Info*/}

        {renderWalletInfoSection()}

        {/* Chart */}
        {/* <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }
        /> */}

        {/* Top Cryptocurrency */}

        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{marginBottom: SIZES.radius}}>
              <Text
                style={{
                  color: theme == 'White' ? COLORS.primary : COLORS.white,
                  ...FONTS.h3,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Top Cryptocurrency
              </Text>
            </View>
          }
          renderItem={({item}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            if (
              item.price_change_percentage_7d_in_currency == 0 &&
              theme == 'White'
            ) {
              priceColor = COLORS.gray;
            } else if (
              item.price_change_percentage_7d_in_currency == 0 &&
              theme == 'Dark'
            ) {
              priceColor = COLORS.lightGray3;
            } else if (
              item.price_change_percentage_7d_in_currency > 0 &&
              theme == 'White'
            ) {
              priceColor = COLORS.darkGreen;
            } else if (
              item.price_change_percentage_7d_in_currency > 0 &&
              theme == 'Dark'
            ) {
              priceColor = COLORS.lightGreen;
            } else if (
              item.price_change_percentage_7d_in_currency < 0 &&
              theme == 'White'
            ) {
              priceColor = 'darkred';
            } else {
              priceColor = 'red';
            }
            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setSelectedCoin(item)}>
                {/* LOGO */}

                <View
                  style={{
                    width: 35,
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: 20,
                      width: 20,
                    }}></Image>
                </View>

                {/* NAME */}

                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: theme == 'White' ? COLORS.primary : COLORS.white,
                      ...FONTS.h3,
                    }}>
                    {item.name}
                  </Text>
                </View>
                {/* FIGURES */}
                <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: theme == 'White' ? COLORS.primary : COLORS.white,
                      ...FONTS.h4,
                    }}>
                    $ {item.current_price}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{rotate: '45deg'}]
                              : [{rotate: '125deg'}],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: 30,
              }}></View>
          }
        />
      </View>
    </MainLayout>
  );
};

// export default Home;
function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
    userData: state.authReducer.userData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
