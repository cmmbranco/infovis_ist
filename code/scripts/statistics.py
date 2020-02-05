import pandas as pd


###Load csv

data = pd.read_csv("../winemag-data-130k-v2.csv")

# print(data.head())

originalshape = data.shape

for attribute in data.columns:
    print("attribute " + attribute + " contains " + str(data[attribute].isnull().sum()) + ' NaN\n' )


print("################################")
print("Dropping Heavy NaN attributes")
print("################################\n")
data.drop(['region_1', 'region_2', 'designation','taster_name', 'taster_twitter_handle'], axis=1, inplace=True)
data.drop(data.columns[0], axis=1, inplace=True)


for attribute in data.columns:
    print("attribute " + attribute + " contains " + str(data[attribute].isnull().sum()) + ' NaN\n' )



print("################################")
print("Dropping Rows with NaN")
print("################################\n")

data.dropna(axis=0, inplace=True)

for attribute in data.columns:
    print("attribute " + attribute + " contains " + str(data[attribute].isnull().sum()) + ' NaN\n' )

finalshape = data.shape


print("Oldshape was: " + str(originalshape))
print("Newshape is: " + str(finalshape))
print("Remaining attributes: "+ str(data.columns) + '\n')

avgPointsByCountry = {}
avgPriceByCountry = {}


for country in data['country'].unique():
    wines = data.loc[data['country'] == country]
    avgPointsByCountry[country] = round(wines['points'].mean(),0)
    avgPriceByCountry[country] = round(wines['price'].mean(),2)


print(avgPriceByCountry)
print('\n')
print(avgPointsByCountry)
