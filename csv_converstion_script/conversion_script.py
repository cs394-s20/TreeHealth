import sys
import os
import json

listOfTrees = []

f = open("HealthyDataV2.csv", "r")
currentTree = {}
currentTree['name'] = 'HealthyDataV2'
currentTreeData = []
skipFirst = True
firstDate = ''
for line in f:
    if skipFirst:
        skipFirst = False
        continue
    currentData = line.split(',')
    currentDataJSON = {}
    if len(firstDate) < 1:
        firstDate = currentData[0]
    currentDataJSON['date'] = currentData[0]
    currentDataJSON['heatRatio'] = currentData[1]
    currentDataJSON['VPD'] = currentData[2]
    currentDataJSON['ambientTemp'] = currentData[3]
    currentTreeData.append(currentDataJSON)
currentTree['firstDate'] = firstDate
currentTree['data'] = currentTreeData
listOfTrees.append(currentTree)

f = open("UnhealthyDataV2.csv", "r")
currentTree = {}
currentTree['name'] = 'HealthyDataV2'
currentTreeData = []
skipFirst = True
firstDate = ''
for line in f:
    if skipFirst:
        skipFirst = False
        continue
    currentData = line.split(',')
    currentDataJSON = {}
    if len(firstDate) < 1:
        firstDate = currentData[0]
    currentDataJSON['date'] = currentData[0]
    currentDataJSON['heatRatio'] = currentData[1]
    currentDataJSON['VPD'] = currentData[2]
    currentDataJSON['ambientTemp'] = currentData[3]
    currentTreeData.append(currentDataJSON)
currentTree['firstDate'] = firstDate
currentTree['data'] = currentTreeData
listOfTrees.append(currentTree)

print (listOfTrees)
finalJSONObject = {}
finalJSONObject['trees'] = listOfTrees

f = open("treesJSON.json", "a")
f.write(json.dumps(finalJSONObject))
f.close()
