import { supabase } from "@/lib/supabase";
import useUserStore from "@/store/useUserStore";
import { CreditRecord } from "@/types/credit";

// 크레딧 사용 내역 조회
export async function getCreditUsageRecord() {
    const { user, setUser }= useUserStore.getState();

    if (!user) {
        return { success: false, message: '사용자 정보가 없습니다.' };
    }

    const { data, error } = await supabase
        .from('credit_history')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        throw new Error('크레딧 사용 내역을 가져오지 못했습니다.');
    }

    if(data){
        const creditRecords: CreditRecord[] = data.map(record => ({
            id: record.id,
            date: record.created_at,
            change: record.amount,
            type: record.type as 'USE' | 'CHARGE' | 'REFUND',
        }));

        setUser({
            ...user,
            creditRecord: creditRecords,
        });
    }
}