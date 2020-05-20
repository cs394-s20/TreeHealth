import sys
import os
import math
import json

listOfTrees = []
k = 9
x = 8
f = open("HealthyDataV2.csv", "r")
currentTree = {}
currentTree['name'] = 'HealthyDataV2'
currentTreeData = []
skipFirst = True
firstDate = ''
#max and min VPD
maximumVPD = float('-inf')
minimumVPD = float('inf')
#float sap flow data
maximumSapFlow = float('-inf')
minimumSapFlow = float('inf')
for line in f:
    if skipFirst:
        skipFirst = False
        continue
    currentData = line.split(',')
    currentDataJSON = {}
    if len(firstDate) < 1:
        firstDate = currentData[0]
    currentDataJSON['date'] = currentData[0]
    currentDataJSON['heatRatio'] = float(currentData[1])
    currentDataJSON['VPD'] = float(currentData[2])
    currentDataJSON['ambientTemp'] = float(currentData[3])
    currentDataJSON['sapFlow'] = (
        k / x) * math.log(float(currentData[1])) * 3600
    currentDataJSON['scaledSapFlow'] = 0.0
    currentDataJSON['scaledVPD'] = 0.0
    currentDataJSON['H_index'] = 0.0
    minimumSapFlow = min(minimumSapFlow, currentDataJSON['sapFlow'])
    minimumVPD = min(minimumVPD, currentDataJSON['VPD'])
    maximumSapFlow = max(maximumSapFlow, currentDataJSON['sapFlow'])
    maximumVPD = max(maximumVPD, currentDataJSON['VPD'])
    #append data
    currentTreeData.append(currentDataJSON)

sumVPD = 0.0
rangeSapFlow = maximumSapFlow - minimumSapFlow
rangeVPD = maximumVPD - minimumVPD
for i in range(len(currentTreeData)):
    # Scaled Sap Flow = (Raw Sap Flow Data Point - Minimum Sap Flow Data)/(Range of Sap Flow)*10
    curScaledSapFlow = 10 * (currentTreeData[i]['sapFlow'] - minimumSapFlow) / rangeSapFlow
    curScaledVPD = 10 * (currentTreeData[i]['VPD'] - minimumVPD) / rangeVPD
    sumVPD += curScaledVPD
    currentTreeData[i]['scaledSapFlow'] = curScaledSapFlow
    currentTreeData[i]['scaledVPD'] = curScaledVPD

#calculate H-index
avgVPD = sumVPD / len(currentTreeData)
sumOfDifference = 0.0
for i in range(len(currentTreeData)):
    sumOfDifference += (currentTreeData[i]['scaledVPD'] - avgVPD)**2
#standard deviation of VPD
sdVPD = math.sqrt(sumOfDifference/(len(currentTreeData)))
ulVPD = avgVPD + 3 * sdVPD
for i in range(len(currentTreeData)):
    curH_index = currentTreeData[i]['scaledSapFlow'] + (ulVPD - currentTreeData[i]['scaledVPD'])
    currentTreeData[i]['H_index'] = curH_index

#find it healthy or not
sumH_index = 0.0
for i in range(len(currentTreeData)):
    sumH_index += currentTreeData[i]['H_index']
avgH_index = sumH_index / len(currentTreeData)
sumOfDifference = 0.0
for i in range(len(currentTreeData)):
    sumOfDifference += (currentTreeData[i]['H_index'] - avgH_index)**2
#standard deviation of VPD
sdH_index = math.sqrt(sumOfDifference/(len(currentTreeData)))
# 95% of all HI points must fall within 3 stdv of the mean
# 90% of all HI points must fall within 2 stdv of the mean
# Maximum 60% of all HI points may fall below the mean
countofWithin3SD = 0
countofWithin2SD = 0
countBelowAVG = 0
for i in range(len(currentTreeData)):
    differenceFromAVG = currentTreeData[i]['H_index'] - avgH_index
    if(abs(differenceFromAVG) <= 3 * sdH_index):
        # print("go there")
        countofWithin3SD += 1
    if(abs(differenceFromAVG) <= 2 * sdH_index):
        countofWithin2SD += 1
    if(currentTreeData[i]['H_index'] < avgH_index):
        countBelowAVG += 1

perRule1 = float(countofWithin3SD) / len(currentTreeData)*100
print(perRule1)
perRule2 = float(countofWithin2SD) / len(currentTreeData)*100
print(perRule2)
perRule3 = float(countBelowAVG) / len(currentTreeData) * 100
print(perRule3)
treeHealth = True
if not (perRule1 >= 95):
    treeHealth = False
if not (perRule2 >= 90):
    treeHealth = False
if not (perRule3 <= 60):
    treeHealth = False 
print(treeHealth)
currentTree['health'] = treeHealth
#true means health
currentTree['firstDate'] = firstDate
currentTree['data'] = currentTreeData
listOfTrees.append(currentTree)


f = open("UnhealthyDataV2.csv", "r")
currentTree = {}
currentTree['name'] = 'UnhealthyDataV2'
currentTreeData = []
skipFirst = True
firstDate = ''
#max and min VPD
maximumVPD = float('-inf')
minimumVPD = float('inf')
#float sap flow data
maximumSapFlow = float('-inf')
minimumSapFlow = float('inf')
for line in f:
    if skipFirst:
        skipFirst = False
        continue
    currentData = line.split(',')
    currentDataJSON = {}
    if len(firstDate) < 1:
        firstDate = currentData[0]
    currentDataJSON['date'] = currentData[0]
    currentDataJSON['heatRatio'] = float(currentData[1])
    currentDataJSON['VPD'] = float(currentData[2])
    currentDataJSON['ambientTemp'] = float(currentData[3])
    currentDataJSON['sapFlow'] = (
        k / x) * math.log(float(currentData[1])) * 3600
    currentDataJSON['scaledSapFlow'] = 0.0
    currentDataJSON['scaledVPD'] = 0.0
    currentDataJSON['H_index'] = 0.0
    minimumSapFlow = min(minimumSapFlow, currentDataJSON['sapFlow'])
    minimumVPD = min(minimumVPD, currentDataJSON['VPD'])
    maximumSapFlow = max(maximumSapFlow, currentDataJSON['sapFlow'])
    maximumVPD = max(maximumVPD, currentDataJSON['VPD'])
    #append data
    currentTreeData.append(currentDataJSON)

sumVPD = 0.0
rangeSapFlow = maximumSapFlow - minimumSapFlow
rangeVPD = maximumVPD - minimumVPD
for i in range(len(currentTreeData)):
    # Scaled Sap Flow = (Raw Sap Flow Data Point - Minimum Sap Flow Data)/(Range of Sap Flow)*10
    curScaledSapFlow = 10 * (currentTreeData[i]['sapFlow'] - minimumSapFlow) / rangeSapFlow
    curScaledVPD = 10 * (currentTreeData[i]['VPD'] - minimumVPD) / rangeVPD
    sumVPD += curScaledVPD
    currentTreeData[i]['scaledSapFlow'] = curScaledSapFlow
    currentTreeData[i]['scaledVPD'] = curScaledVPD

#calculate H-index
avgVPD = sumVPD / len(currentTreeData)
sumOfDifference = 0.0
for i in range(len(currentTreeData)):
    sumOfDifference += (currentTreeData[i]['scaledVPD'] - avgVPD)**2
#standard deviation of VPD
sdVPD = math.sqrt(sumOfDifference/(len(currentTreeData)))
ulVPD = avgVPD + 3 * sdVPD
for i in range(len(currentTreeData)):
    curH_index = currentTreeData[i]['scaledSapFlow'] + (ulVPD - currentTreeData[i]['scaledVPD'])
    currentTreeData[i]['H_index'] = curH_index

#find it healthy or not
sumH_index = 0.0
for i in range(len(currentTreeData)):
    sumH_index += currentTreeData[i]['H_index']
avgH_index = sumH_index / len(currentTreeData)
sumOfDifference = 0.0
for i in range(len(currentTreeData)):
    sumOfDifference += (currentTreeData[i]['H_index'] - avgH_index)**2
#standard deviation of VPD
sdH_index = math.sqrt(sumOfDifference/(len(currentTreeData)))
# 95% of all HI points must fall within 3 stdv of the mean
# 90% of all HI points must fall within 2 stdv of the mean
# Maximum 60% of all HI points may fall below the mean
countofWithin3SD = 0
countofWithin2SD = 0
countBelowAVG = 0
for i in range(len(currentTreeData)):
    differenceFromAVG = currentTreeData[i]['H_index'] - avgH_index
    if(abs(differenceFromAVG) <= 3 * sdH_index):
        # print("go there")
        countofWithin3SD += 1
    if(abs(differenceFromAVG) <= 2 * sdH_index):
        countofWithin2SD += 1
    if(currentTreeData[i]['H_index'] < avgH_index):
        countBelowAVG += 1

perRule1 = float(countofWithin3SD) / len(currentTreeData)*100
print(perRule1)
perRule2 = float(countofWithin2SD) / len(currentTreeData)*100
print(perRule2)
perRule3 = float(countBelowAVG) / len(currentTreeData) * 100
print(perRule3)
treeHealth = True
if not (perRule1 >= 95):
    treeHealth = False
if not (perRule2 >= 90):
    treeHealth = False
if not (perRule3 <= 60):
    treeHealth = False 
print(treeHealth)

currentTree['health'] = treeHealth
#true means health
currentTree['firstDate'] = firstDate
currentTree['data'] = currentTreeData
listOfTrees.append(currentTree)


# print(listOfTrees)
finalJSONObject = {}
finalJSONObject['trees'] = listOfTrees

f = open("treesJSON.json", "w")
f.write(json.dumps(finalJSONObject))
f.close()
