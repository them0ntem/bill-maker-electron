declare var fs:any;
declare var nconf:any;

nconf.use('file', { file: './app/config.json' });
nconf.load();
export class ConfigService {
	save() {
		nconf.save((err) => {
			if (err) {
				console.error(err.message);
				return;
			}
		});
	}

	get companyDetail():any {
		return nconf.get('company')
	}

	get billSequence():number {
		return nconf.get('sequence:bill')
	}

	get paymentSequence():number {
		return nconf.get('sequence:payment')
	}

	set companyDetail(val) {
		if (typeof val.mobile_no == "string")
			val.mobile_no = val.mobile_no.split(',');
		nconf.set('company', val);
		this.save();
	}

	set billSequence(val:number) {
		nconf.set('sequence:bill', val);
		this.save();
	}

	set paymentSequence(val:number) {
		nconf.set('sequence:payment', val);
		this.save();
	}

	billSequenceInc() {
		this.billSequence = this.billSequence + 1;
		return this.billSequence;
	}

	paymentSequenceInc() {
		this.paymentSequence = this.paymentSequence + 1;
		return this.paymentSequence;
	}
}
