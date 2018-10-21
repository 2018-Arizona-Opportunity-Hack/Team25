import numpy as np
import cv2
import math

address = "C:/Users/HARI/Desktop/Capture11.png"
img = cv2.imread(address)
temp = img

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#cv2.imshow('img',img)
ret,thresh = cv2.threshold(gray,160,200,1)
contours,h = cv2.findContours(thresh,1,2)
print("contours", len(contours))

max_area = 0

for cnt in contours:
    x,y,w,h = cv2.boundingRect(cnt) # coordinates of bounding box
    if([x,y] not in rect_list): # remove duplicate contours
        if(x not in x_list):
               area = cv2.contourArea(cnt)
               if(area > max_area): 
                print("area", area)
                max_area = area
                max_x, max_y, max_w, max_h = x - 4,y -4,w -4,h -4

      

crop_img = temp[max_y:max_y+max_h , max_x:max_x+max_w]
cv2.destroyAllWindows()
cv2.imshow("cropped", crop_img)
cv2.imwrite('cropped_im.png', crop_img)
cropped_image = cv2.imwrite('cropped_im.png', crop_img)
img = cv2.imread('cropped_im.png')

return_choice(cropped_im, 3, "vertical")

cv2.waitKey(0)
cv2.destroyAllWindows()
