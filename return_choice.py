import numpy as np
import cv2
import math


def return_choice(img, no_of_options = 4, direction = "horizontal"):
    # Convert to Greyscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # In case image not detected
    # img = cv2.GaussianBlur(img,(10,10),0)
    # cv2.imshow('img',img)
    ret,thresh = cv2.threshold(gray,160,200,1)
    # Direction ( horizontal = 0 && vertical = 1)
    # direction = 0
    # Find contours in image
    contours,h = cv2.findContours(thresh,1,2)
    rect_list = [] # List of rectangles
    cent_list = [] # list of centres
    # print("contours", len(contours))
    for cnt in contours:
        x,y,w,h = cv2.boundingRect(cnt) # coordinates of bounding box
        cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
        if([x,y] not in rect_list): # remove duplicate contours
         #   if(x not in x_list):
                area = cv2.contourArea(cnt)
         #      print(x,y,w,h)
         #      print("!!centre", x + h/2, y + w/2)
         #      print(area)
         #      cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
                rect_list.append([x,y])
                cent_list.append([x+ h/2, y + w/2])
         #      x_list.append(x)
    # print(cent_list)
    
    # If more than one tick (options + 1 contours) , flag and return:
    if(len(cent_list) > no_of_options + 1):
        print("FLAGGED")
        return 0

    if direction == "horizontal":
        dir = 0
    else:
        dir = 1

    cent_list.sort(key=lambda x: x[dir]) # sort according to direction of options
    # print(cent_list)
    euc_distance = []
    # find euclidean distance between centres
    for i in range(len(cent_list)-1):
        a = pow(cent_list[i+1][0] - cent_list[i][0], 2) 
        b = pow(cent_list[i+1][1] - cent_list[i][1], 2)
        euc_distance.append(math.sqrt(a+b))
    # print(euc_distance)

    # find index of elements with minimum euclidean distance
    minIndex = euc_distance.index(min(euc_distance))
    # print("CHOICE: ", minIndex + 1)
    return minIndex + 1 # return choice number
        



  
