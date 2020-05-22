import sys, os
import math 
import json 

# Constants 
k = 9
x = 8 

listOfTrees = []
treeFilePaths = ["Norwegian Spruce.csv", "Balsam Fir.csv"]
# Read in Dated Tree Info
for tree in treeFilePaths:
	currentTree = {}
	currentTree['name'] = tree.split(".")[0]
	currentTreeData = []
	firstDate = ''
	serialNumber = 0

	maxVPD = float('-inf')
	minVPD = float('inf')
	maxSapFlow = float('-inf')
	minSapFlow = float('inf')

	f = open(tree, "r")

	for line in f.readlines()[1:]: 
		[serialNumber, date, heatRatio, VPD, ambientTemp] = line.split(',')
		
		if firstDate == '':
			firstDate = date
			currentTree['firstDate'] = firstDate
		
		currentDataJSON = {}
		currentDataJSON['date'] = date
		currentDataJSON['heatRatio'] = float(heatRatio)
		currentDataJSON['VPD'] = float(VPD)
		currentDataJSON['ambientTemp'] = float(ambientTemp)
		currentDataJSON['sapFlow'] = (k / x) * math.log(float(heatRatio)) * 3600
		
		minSapFlow = min(minSapFlow, currentDataJSON['sapFlow'])
		maxSapFlow = max(maxSapFlow, currentDataJSON['sapFlow'])
		minVPD = min(minVPD, currentDataJSON['VPD'])
		maxVPD = max(maxVPD, currentDataJSON['VPD'])

		currentTreeData.append(currentDataJSON)

	# Scale VPD and SapFlow 
	sumVPD = 0.0 
	rangeVPD = maxVPD - minVPD
	rangeSapFlow = maxSapFlow - minSapFlow
	for i in range(len(currentTreeData)):
		currentTreeData[i]['scaledSapFlow'] = 10 * float(currentTreeData[i]['sapFlow'] - minSapFlow) / rangeSapFlow
		currentTreeData[i]['scaledVPD'] = 10 * float(currentTreeData[i]['VPD'] - minVPD) / rangeVPD
		sumVPD += currentTreeData[i]['scaledVPD']

	# Calculate Mean and Std. Dev. of VPD
	meanVPD = sumVPD / len(currentTreeData)
	sumDifVPD = 0.0
	for i in range(len(currentTreeData)):
		sumDifVPD += (currentTreeData[i]['scaledVPD'] - meanVPD) ** 2

	sdVPD = math.sqrt(sumDifVPD / len(currentTreeData))
	ulVPD = meanVPD + 3 * sdVPD

	# Calculate Health Index
	for i in range(len(currentTreeData)):
		currentTreeData[i]['H_index'] = currentTreeData[i]['scaledSapFlow'] + (ulVPD - currentTreeData[i]['scaledVPD'])
	
	# Calculate Baseline Mean and Std. Dev. of Health Index for FIRST 2 WEEKS
	sumHIndex = 0.0
	for i in range(14):
		sumHIndex += currentTreeData[i]['H_index']

	meanHI = sumHIndex / 14
	sumDifHI = 0.0
	for i in range(14):
		sumDifHI += (currentTreeData[i]['H_index'] - meanHI) ** 2

	sdHI = math.sqrt(sumDifHI / 14)

	# Determine Tree Health Status via Rules:
	# 	95% of all HI points must fall within 3 stdv of the mean
	# 	90% of all HI points must fall within 2 stdv of the mean
	# 	Maximum 60% of all HI points may fall below the mean

	countWithin3SD = 0 
	countWithin2SD = 0
	countBelowMean = 0 
	for i in range(len(currentTreeData)):
		differencesFromMean = abs(currentTreeData[i]['H_index'] - meanHI)
		if (differencesFromMean <= 3 * sdHI):
			countWithin3SD += 1
		if (differencesFromMean <= 2 * sdHI): 
			countWithin2SD += 1
		if (currentTreeData[i]['H_index'] < meanHI):
			countBelowMean += 1

	perRule1 = float(countWithin3SD) / len(currentTreeData) * 100 
	perRule2 = float(countWithin2SD) / len(currentTreeData) * 100 
	perRule3 = float(countBelowMean) / len(currentTreeData) * 100 

	print("Rule 1: ", perRule1)
	print("Rule 2: ", perRule2)
	print("Rule 3: ", perRule3)

	violated = 0 

	if perRule1 < 95:
		violated += 1
	if perRule2 < 90:
		violated += 1
	if perRule3 > 60:
		violated += 1

	print("Rules Violated: ", violated)
	print("Tree Health: ", violated == 0)
	currentTree['serialNumber'] = int(serialNumber)
	currentTree['health'] = violated
	currentTree['meanHI'] = meanHI
	currentTree['sdHI'] = sdHI
	currentTree['data'] = currentTreeData
	listOfTrees.append(currentTree)

	# Convert to JSON
	finalJSONObject = {}
	finalJSONObject['trees'] = listOfTrees

	# Write to JSON File
	f = open("treesJSON.json", "w")
	f.write(json.dumps(finalJSONObject))
	f.close()





