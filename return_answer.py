import numpy as np
import cv2
import math

temp = cv2.imread('C:/Users/HARI/Desktop/Capture11.png')
img = cv2.imread('C:/Users/HARI/Desktop/Capture11.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#cv2.imshow('img',img)
ret,thresh = cv2.threshold(gray,160,200,1)
    # Direction ( horizontal = 0 && vertical = 1)
    # direction = 0
    # Find contours in imagez
contours,h = cv2.findContours(thresh,1,2)
rect_list = [] # List of rectangles
cent_list = [] # list of centres
x_list = []
print("contours", len(contours))

max_area = 0

for cnt in contours:
    x,y,w,h = cv2.boundingRect(cnt) # coordinates of bounding box
    #cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
    if([x,y] not in rect_list): # remove duplicate contours
        if(x not in x_list):
               area = cv2.contourArea(cnt)
               if(area > max_area): 
                print("area", area)
                max_area = area
                max_x, max_y, max_w, max_h = x - 4,y -4,w -4,h -4
        #       print(x,y,w,h)
        #      print("!!centre", x + h/2, y + w/2)
        #      print(area)
        #      cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
               rect_list.append([x,y])
               cent_list.append([x+ h/2, y + w/2])
               x_list.append(x)


#print("max", max_x, max_y, max_w, max_h)
#max_area1 = cv2.rectangle(img,(max_x,max_y),(max_x+max_w,max_y+max_h),(0,255,0),2)

crop_img = temp[max_y:max_y+max_h , max_x:max_x+max_w]
cv2.destroyAllWindows()
cv2.imshow("cropped", crop_img)
cv2.imwrite('cropped_im.png', crop_img)
cropped_image = cv2.imwrite('cropped_im.png', crop_img)
img = cv2.imread('cropped_im.png')

return_choice(cropped_im, 3, "vertical")

#cv2.imwrite('max_area1' +'.png', img)
#cv2.imshow('max_area1', max_area1)
    # print(cent_list)
#x,y,w,h = cv2.boundingRect(cnt)
#cv2.imshow('img',img)
cv2.waitKey(0)
cv2.destroyAllWindows()