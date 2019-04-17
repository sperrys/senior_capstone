#
# gimme_peaks.py
# 
# gives ya peaks
#
# By: Haiting Chan and Ashton Stephens 
# date: 4/14/19
# 

import numpy as np
import matplotlib.pyplot as plt
import scipy.signal as sig
import sys

def usage () :
    print("\033[31musage:\n    {} [filename.csv]\033[0m".format(sys.argv[0]))
    exit(1)

def main() :
    
    # check the input is valid
    if (len(sys.argv) != 2):
        usage()

    # read the data from the file
    data = []
    with open (sys.argv[1], 'r') as file_:
        data = [line.split(',') for line in file_.readlines()]

    # convert the csv of 'vertical' strings in the file 
    # to 'horizontal' arrays on ints
    AcXs, AcYs, AcZs, GyXs, GyYs, GyZs, times = \
        np.transpose(np.array(data[1:])).astype(np.int)

    # convert times to milliseconds and start it at 0
    times = np.divide(np.subtract(times, min(times)),1000)

    
    # find_peaks find the indices in the array that have peaks. Here
    # we extract the times at which those peaks happened
    def get_peaks (y, x) :
        return [x[i] for i in \
                sig.find_peaks(y, height = 15000,  prominence=100)[0]]

    AcXs_peaks = get_peaks (AcXs, times)
    AcYs_peaks = get_peaks (AcYs, times)
    AxZs_peaks = get_peaks (AcZs, times)

    # get the difference between datapoints and get the
    # average of those differences
    print('average stride length: {}'.format(np.mean(np.diff(AcXs_peaks))))

    # the arrays we want to actually display packaged up for the
    # following loop to easily process
    display_me = [('AcXs', AcXs), ('AcYs', AcYs), ('AcZs', AcZs)]
    
    for i in range(1,len(display_me)+1):
        name, array = display_me[i-1]
        plt.subplot(len(display_me), 1, i)
        plt.title(name)
        plt.plot(times, array)

    plt.show()

#%import('./design_lab_walking_4_6_19.csv')
#%AcXYZ = [AcX./max(AcX) AcY./max(AcY) AcZ./max(AcZ)];
#AcXYZ = [AcX AcY AcZ];
#t = (time - min(time)) ./ 1000;

#%t = t(t>8 & t < 18);
#%AcXYZ = [AcX(t>8 & t<18) AcY(t>8 & t<18) AcZ(t>8 & t<18)];
#%
#% figure;
#% subplot(3,1,1);
#% plot(time, AcX);
#% xlabel('time');
#% ylabel('Acceleration (X)');
#% subplot(3,1,2);
#% plot(time, AcY);
#% xlabel('time');
#% ylabel('Acceleration (Y)')
#% subplot(3,1,3);
#% plot(time, AcZ);
#% xlabel('time');
#% ylabel('Acceleration (Z)')

#figure;
#subplot(3,1,1);
#plot(t, AcXYZ(:,1));
#xlabel('time');
#ylabel('velocity (X)');
#subplot(3,1,2);
#plot(t, AcXYZ(:,2));
#xlabel('time');
#ylabel('velocity (Y)')
#subplot(3,1,3);
#plot(t, AcXYZ(:,3));
#xlabel('time');
#ylabel('velocity (Z)')

#t8_12 = t(t>8 & t <12);
#figure;
#plot(t8_12, AcXYZ(t(t>8 & t <12),1)

#[pks1,locs1] = findpeaks(AcXYZ(:,1), t,'MinPeakHeight',15000,'MinPeakProminence',100);

#%[pks1,locs1] = findpeaks(AcXYZ(:,1), t,);

#figure;
#stem(locs1, pks1);

#% find average distance between two things
main()
